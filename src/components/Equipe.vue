<template>
  <b-container>
    <b-row class="justify-content-between mb-4" v-if="ongletActuel != 'liste'">
      <b-button v-on:click="ongletActuel='liste'" class="ml-4">Retour</b-button>
      <h2 class="mr-4">{{membreSelectionne.prenom}} {{membreSelectionne.nom}}</h2>
    </b-row>
    <b-list-group v-if="ongletActuel=='liste'">
      <b-list-group-item v-for="membre in equipe">
        <div class="d-flex w-100 justify-content-between">
          <div>{{membre.prenom}} {{membre.nom}}</div>
          <div>
            <b-button variant="outline-primary" v-on:click="membreSelectionne=membre; ongletActuel='ficheSalarie';">Infos</b-button>
            <b-button variant="outline-primary" v-on:click="membreSelectionne=membre; ongletActuel='planning';">Planning</b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>

    <FicheSalarie
      v-bind:utilisateur="membreSelectionne"
      v-if="ongletActuel=='ficheSalarie'"
    ></FicheSalarie>
    <Planning
      v-bind:utilisateur="membreSelectionne"
      v-bind:droits="'modification'"
      v-if="ongletActuel=='planning'"
    ></Planning>
  </b-container>
</template>

<script>
  import API from '@/api.js'
  import FicheSalarie from '@/components/FicheSalarie.vue'
  import Planning from '@/components/Planning.vue'

  export default
  {
    props:['utilisateur'],
    components:
    {
      FicheSalarie,
      Planning
    },
    data: function()
    {
      return{
        equipe: [],
        membreSelectionne: {},
        ongletActuel: "liste"
      };
    },
    /**
     * Récupère les utilisateurs faisant partie de l'équipe
     */
    created: async function()
    {
      var self = this;
      this.utilisateur.equipe.forEach(async function(nomMembre)
      {
        self.equipe.push(await API.getUser(nomMembre));
      });
    }
  }
</script>
