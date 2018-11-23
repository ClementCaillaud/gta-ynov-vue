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

// Initialisation BDD
import PouchDB from 'pouchdb'
import Axios from 'axios'
var db = new PouchDB('bdd');

db.get("test")
  .then(function(doc){})
  .catch(function(err)
  {
    db.put({_id:"test"});
    Axios.get("bdd.json").then(function(reponse)
    {
      reponse.data.utilisateurs.forEach(function(utilisateur)
      {
        utilisateur._id = utilisateur.login;

        db.get(utilisateur.login)
          .then(function(doc)
          {
            utilisateur._rev = doc._rev;
            db.put(utilisateur);
          })
          .catch(function(err)
          {
            db.put(utilisateur);
          });
      });
    });
  });


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
