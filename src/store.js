// View Based Imports
import Vue from 'vue'
import Vuex from 'vuex'

// 3rd Party Imports
import axios from 'axios';

// Use Vuex
Vue.use(Vuex)

// Default Store
export default new Vuex.Store({
  state: {
    // List of champions from the API
    champions: [],
    // Version of the Current League API
    version: '',
  },
  mutations: {
    // Gets the Champions from the API.
    'GET_CHAMPIONS' (state) {
      // Calls for the full champion list to get all of their names.
      axios.get('https://ddragon.leagueoflegends.com/cdn/' + state.version + '/data/en_US/champion.json')
        .then(response => response.data)
        .then( data => Object.entries(data))
        .then( data => Object.entries(data[3][1]))
        .then(champions => {
          champions.forEach(champion => {
            // This then gets the individual champions from the large list.  This is because the large API doesn't have enough information so each individual champion needs to be Retrieved.
            axios.get('https://ddragon.leagueoflegends.com/cdn/' + state.version + '/data/en_US/champion/' + champion[0] + '.json')
              .then( response => response.data)
              .then( data => Object.entries(data))
              .then( data=> data[3][1])
              .then( data => Object.entries(data))
              .then ( data => {
                // Creates a new object to be pushed to the champions array in the state.
                  let newChampion = {
                    version: state.version,
                    championName: data[0][1].name,
                    championId: data[0][1].id,
                    championTitle: data[0][1].title,
                    championBlurb: data[0][1].blurb,
                    championImage: 'https://ddragon.leagueoflegends.com/cdn/' + state.version + '/img/champion/' + data[0][1].image.full,
                    championSplash: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + data[0][1].id + '_0.jpg',
                    championLore: data[0][1].championLore,
                    championPassive: data[0][1].passive,
                    championSpells: data[0][1].spells,
                    championStats: data[0][1].stats,
                    championTags: data[0][1].tags
                  };
                  state.champions.push(newChampion);
              })
              .catch(e => console.log(e))
          });
        })
        .catch(e => console.log(e));
    }
  },
  actions: {
    getChampions({commit}){
      commit('GET_CHAMPIONS');
    },
    getVersion({commit}){
      // Gets the version of the league api.
      return new Promise((resolve, reject) => {
        axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
          .then(response => response.data)
          .then( data => this.state.version = data[0])
          .then( data => resolve())
          .catch(e => console.log(e));
      }, error => {
        reject(error);
      })
    }
  }
})
