import Vue from 'vue'
import router from './routing'
import App from './App.vue'
import store from './store/index.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt,faEdit,faUser,faEnvelope,faMobileAlt,faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt,faEdit,faUser,faEnvelope,faMobileAlt,faArrowLeft  )

Vue.component('font-awesome-icon', FontAwesomeIcon)
require('./assets/sass/main.scss');



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

