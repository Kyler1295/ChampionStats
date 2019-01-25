<template>
  <main>
    <header>
      <app-logo />
      <label for="championSort">Search for a Champion: </label>
      <input name="championSort" type="text" v-model="champSortTerm" value="Search For A Champion">
    </header>
    <div class="championList" v-if="loaded">
      <app-champion 
        v-for="champion in championList" 
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

  export default {
    data() {
      return {
        champSortTerm: '',
        loaded: false
      }
    },
    computed: {
      // Gets the list of champions from the store
      championList() {
        return this.$store.state.champions;
      },
      currentYear() {
        let currentYear = new Date().getFullYear();
        return currentYear;
      }
    },
    created() {
      // Calls to get the version, and then calls to get the list of champions.
      // Version Dispatch
      this.$store.dispatch('getVersion').then(response => {
        // Champion List Dispatch
        this.$store.dispatch('getChampions');
      }, error => {
        console.log(error);
      }).then(resposne => this.loaded = true)
    },
    components: {
      appChampion: Champion,
      appLogo: Logo
    }
  }
</script>

<style lang="scss">
  // Global Styles
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
  body {
    background-color: #eee;
  }

  // End Global Styles
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    label {
      margin-left: 15%;
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
    padding: 15px;
    p {
      color: white;
    }
  }
</style>
