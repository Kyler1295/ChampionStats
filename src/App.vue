<template>
  <main>
    <header>
      <app-logo />
      <label for="championSort">Search for a Champion: </label>
      <input name="championSort" type="text" v-model="champSortTerm" value="Search For A Champion">
    </header>
    <div class="championList" v-if="loaded">
      <app-champion 
        v-for="champion in championListSorted" 
        :key="champion.championName"
        :champion="champion"
        v-show="champion.championName.toLowerCase().includes(champSortTerm.toLowerCase())"
      />
    </div>
    <div class="loading" v-else>
      <h3>Loading</h3>
    </div>
    <footer>
      <p>&copy; {{ currentYear }} Kyle Rosen Development</p>
    </footer>
  </main>
</template>

<script>
  // Store Imports
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';

  // Component Imports
  import Champion from './components/Champion.vue';
  import Logo from './components/Logo.vue';

  // Analytics
  import { page } from 'vue-analytics';

  export default {
    data() {
      return {
        champSortTerm: '',
        championList: [],
        loaded: false
      }
    },
    computed: {
      // Gets the list of champions from the store
      championListSorted() {
        return this.$store.state.champions.sort((a,b) => (a.championName > b.championName) ? 1 : ((b.championName > a.championName) ? -1 : 0));
      },
      currentYear() {
        let currentYear = new Date().getFullYear();
        return currentYear;
      }
    },
    methods: {
      track() {
        page('/');
      }
    },
    created() {
      // Calls to get the version, and then calls to get the list of champions.
      // Version Dispatch
      this.$store.dispatch('getVersion').then(response => {
        // Champion List Dispatch
        this.$store.dispatch('getChampions')
        .then(response => this.championList = this.$store.state.champions)
        .then(resposne => this.loaded = this.$store.state.listLoaded);
      }, error => {
        console.log(error);
      });
    },
    components: {
      appChampion: Champion,
      appLogo: Logo
    }
  }
</script>

<style lang="scss">
  // Variables
  $PrimaryBlue: #476C9B;
  $LightBlue: #ADD9F4;
  $AccentRed: #984447;
  $AccentBlue: #468C98;
  $Black: #101419;
  $Roboto: 'Roboto', sans-serif;
  $Myung: 'Song Myung', serif;
  // Global Styles
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $Myung;
    color: $Black;
  }
  p, span, b, small, a {
    margin: 0;
    font-family: $Roboto;
    color: $Black;
    font-size: .8rem;
  }
  li {
    b {
    font-size: 1rem;
    }
    p {
      font-size: 1rem;
      margin-left: 3%;
    }
  }
  body {
    background-color: $LightBlue;
  }

  // End Global Styles
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1.5rem;
    background-color: $PrimaryBlue;
    label {
      margin-left: 15%;
    }
    input {
          background-color: #fff;
          border-color: $AccentRed;
          color: #363636;
          box-shadow: inset 0 1px 2px $AccentBlue;
          -webkit-appearance: none;
          align-items: center;
          border: 1px solid transparent;
          border-radius: 4px;
          box-shadow: none;
          display: inline-flex;
          font-size: 1rem;
          height: 2.25em;
          justify-content: flex-start;
          line-height: 1.5;
          position: relative;
          vertical-align: top;
          margin-left: 1%;
    } input:focus {
          border: 2px solid $AccentRed;
          box-shadow: 0 0 0 0.125em $AccentBlue;
    }
  }
  .championList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    div {
      padding: 1%;
    }
  }
  footer {
    background: black;
    width: 100vw;
    height: 5vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      color: white;
      padding: 0 0 0 15px;
    }
  }
</style>
