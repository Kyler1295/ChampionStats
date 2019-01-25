import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-133308419-1'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
