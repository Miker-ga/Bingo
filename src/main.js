import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import './styles.scss'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
