import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import moment from 'moment'
Vue.use(Buefy)

Vue.use(VueSimpleAlert);
axios.defaults.baseURL = 'https://localhost:44338/api/'

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})
Vue.filter('Date', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

