<template>
  <div class="pt-4">
    <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="d-md-none"><span v-bind:class="currentTab.icone"></span> {{currentTab.nom}}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item
            v-for="tab in tabs"
            v-bind:key="tab.component"
            v-bind:class="[{ active: currentTab === tab }]"
            v-on:click="currentTab = tab"
          >
            <span v-bind:class="tab.icone"></span>
            {{tab.nom}}
          </b-nav-item>
          <b-nav-item v-on:click="deconnexion()"><span class="fas fa-sign-out-alt fa-lg"></span> Se déconnecter</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <component class="mt-5" v-bind:nomUtilisateur="login" v-bind:is="currentTab.component"></component>
  </div>
</template>

<script>
  import PouchDB from 'pouchdb'
  import FicheSalarie from '@/components/FicheSalarie.vue'
  import Planning from '@/components/Planning.vue'
  import TableauDeBord from '@/components/TableauDeBord.vue'
  import Equipe from '@/components/Equipe.vue'

  export default
  {
    data: function()
    {
      return{
        login: "",
        tabs: [],
        currentTab: {}
      };
    },
    components:
    {
      FicheSalarie,
      Planning,
      TableauDeBord,
      Equipe
    },
    methods:
    {
      deconnexion: function()
      {
        this.$router.push({name: "accueil"});
      }
    },
    /**
     * Vérifie l'authentification et charge les pages en fonction du rôle
     */
    created: function()
    {
      var db = new PouchDB('bdd');
      var self = this;

      const PLANNING =
      {
        nom: "Planning",
        component: "Planning",
        icone: "fas fa-calendar-alt fa-lg"
      };
      const TABLEAUDEBORD =
      {
        nom: "Tableau de bord",
        component: "TableauDeBord",
        icone: "fas fa-clipboard fa-lg"
      };
      const FICHESALARIE =
      {
        nom: "Fiche salarié",
        component: "FicheSalarie",
        icone: "fas fa-address-card fa-lg"
      };
      const GESTIONEQUIPE =
      {
        nom: "Gestion équipe",
        component: "Equipe",
        icone: "fas fa-users fa-lg"
      }

      db.get('login_info')
        .then(function(doc)
        {
          self.login = doc.login;
          //Chargement des pages en fonction du rôle
          switch (doc.role)
          {
            case "salarie":
              self.tabs = [PLANNING, TABLEAUDEBORD, FICHESALARIE];
              self.currentTab = self.tabs[0];
              break;
            case "responsable":
              self.tabs = [PLANNING, TABLEAUDEBORD, FICHESALARIE, GESTIONEQUIPE]
              self.currentTab = self.tabs[0];
              break;
            case "drh":
              break;
            default:
              break;
          }
        })
        .catch(function(err)
        {
          self.$router.push({name: "accueil"});
        });
    }
  }
</script>
