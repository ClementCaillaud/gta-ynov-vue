<template>
  <div class="pt-4">
    <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="d-md-none">{{currentTab.nom}}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-for="tab in tabs" v-bind:key="tab.component" v-bind:class="[{ active: currentTab === tab }]" v-on:click="currentTab = tab">
            {{tab.nom}}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <component class="mt-5" v-bind:is="currentTab.component"></component>
  </div>
</template>

<script>
  import API from '@/api.js'
  import FicheSalarie from '@/components/FicheSalarie.vue'
  import Planning from '@/components/Planning.vue'
  import TableauDeBord from '@/components/TableauDeBord.vue'

  export default
  {
    name:"gta",
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
      TableauDeBord
    },
    created: async function()
    {
      //Récupération de l'utilisateur
      var utilisateur = await API.getUser(this.$parent.$parent.loginUtilisateur);
      //Chargement des pages en fonction du rôle
      switch (utilisateur.role)
      {
        case "salarie":
          this.tabs = [
            {
              nom: "Planning",
              component: "Planning"
            },
            {
              nom: "Tableau de bord",
              component: "TableauDeBord"
            },
            {
              nom: "Fiche salarié",
              component: "FicheSalarie"
            }];
          this.currentTab = this.tabs[0];
          break;
        case "responsable":
          this.tabs = [
            {
              nom: "Planning",
              component: "Planning"
            },
            {
              nom: "Tableau de bord",
              component: "TableauDeBord"
            },
            {
              nom: "Fiche salarié",
              component: "FicheSalarie"
            }];
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
