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
    <component
      class="mt-5"
      v-bind:is="currentTab.component"
      v-bind:utilisateur="utilisateur"
      v-bind:droits="'lecture'"
      v-on:modifInfos="utilisateur = $event"
    >
    </component>
  </div>
</template>

<script>
  import API from '@/api.js'
  import FicheSalarie from '@/components/FicheSalarie.vue'
  import Planning from '@/components/Planning.vue'
  import TableauDeBord from '@/components/TableauDeBord.vue'
  import Equipe from '@/components/Equipe.vue'

  export default
  {
    props:['loginUtilisateur'],
    data: function()
    {
      return{
        utilisateur: {},
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
        this.$parent.$emit('deconnexion');
        this.$router.push({name: "accueil"});
      }
    },
    /**
     * Vérifie l'authentification et charge les pages en fonction du rôle
     */
    created: async function()
    {
      if(this.loginUtilisateur == "")
      {
        this.$router.push({name: "accueil"});
      }
      //Récupération de l'utilisateur
      this.utilisateur = await API.getUser(this.loginUtilisateur);
      //Chargement des pages en fonction du rôle
      switch (this.utilisateur.role)
      {
        case "salarie":
          this.tabs = [
            {
              nom: "Planning",
              component: "Planning",
              icone: "fas fa-calendar-alt fa-lg"
            },
            {
              nom: "Tableau de bord",
              component: "TableauDeBord",
              icone: "fas fa-clipboard fa-lg"
            },
            {
              nom: "Fiche salarié",
              component: "FicheSalarie",
              icone: "fas fa-address-card fa-lg"
            }];
          this.currentTab = this.tabs[0];
          break;
        case "responsable":
          this.tabs =
          [
            {
              nom: "Planning",
              component: "Planning",
              icone: "fas fa-calendar-alt fa-lg"
            },
            {
              nom: "Tableau de bord",
              component: "TableauDeBord",
              icone: "fas fa-clipboard fa-lg"
            },
            {
              nom: "Fiche salarié",
              component: "FicheSalarie",
              icone: "fas fa-address-card fa-lg"
            },
            {
              nom: "Gestion équipe",
              component: "Equipe",
              icone: "fas fa-users fa-lg"
            }
          ];
          this.currentTab = this.tabs[0];
          break;
        case "drh":
          break;
        default:
          break;
      }
    }
  }
</script>
