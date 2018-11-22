import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ToggleButton);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
