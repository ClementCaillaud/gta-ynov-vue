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
            <b-button class="mr-1" variant="outline-primary" v-on:click="membreSelectionne=membre; ongletActuel='ficheSalarie';">Infos</b-button>
            <b-button variant="outline-primary" v-on:click="membreSelectionne=membre; ongletActuel='planning';">Planning</b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>

    <FicheSalarie
      v-bind:nomUtilisateur="membreSelectionne.login"
      v-if="ongletActuel=='ficheSalarie'"
    ></FicheSalarie>
    <Planning
      v-bind:nomUtilisateur="membreSelectionne.login"
      v-if="ongletActuel=='planning'"
    ></Planning>
  </b-container>
</template>

<script>
  import PouchDB from 'pouchdb'
  import FicheSalarie from '@/components/FicheSalarie.vue'
  import Planning from '@/components/Planning.vue'

  export default
  {
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
    created: function()
    {
      var db = new PouchDB('bdd');
      var self = this;

      db.get('login_info')
        .then(function(doc)
        {
          db.get(doc.login)
            .then(function(doc)
            {
              doc.equipe.forEach(function(membre)
              {
                db.get(membre)
                  .then(function(doc)
                  {
                    self.equipe.push(doc);
                  })
                  .catch(function(err){});
              });
            })
            .catch(function(err){});
        })
        .catch(function(err){});
    }
  }
</script>
