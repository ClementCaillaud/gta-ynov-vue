<template>
  <b-container>
    <!-- INFOS SAUVEGARDE -->
    <b-alert :show="succesSauvegarde" variant="success" dismissible @dismissed="succesSauvegarde=false">Vos données ont été mises à jour</b-alert>

    <!-- FORMUALIRE -->
    <b-row>
      <b-col md="6">
        <b-form-group label="Nom">
          <b-form-input type="text" v-model="infos.nom"></b-form-input>
        </b-form-group>
        <b-form-group label="Prénom">
          <b-form-input type="text" v-model="infos.prenom"></b-form-input>
        </b-form-group>
        <b-form-group label="Date de naissance">
          <b-form-input type="text" v-model="infos.dateNaissance"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Adresse">
          <b-form-input type="text" v-model="infos.adresse"></b-form-input>
        </b-form-group>
        <b-form-group label="N° téléphone">
          <b-form-input type="text" v-model="infos.tel"></b-form-input>
        </b-form-group>
        <b-form-group label="Mail">
          <b-form-input type="text" v-model="infos.mail"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <!--BOUTONS-->
    <button class="btn btn-danger" v-on:click="reset()">Annuler</button>
    <button class="btn btn-success ml-5" v-on:click="enregistrer()">Enregistrer</button>
  </b-container>
</template>

<script>
  import PouchDB from 'pouchdb'

  export default
  {
    props:['nomUtilisateur'],
    data: function()
    {
      return{
        succesSauvegarde: false,
        infos: {}
      }
    },
    methods:
    {
      /**
       * Enregistre les modifications effectuées
       */
      enregistrer: function()
      {
        var db = new PouchDB('bdd');
        var self = this;

        db.put(self.infos)
          .then(function()
          {
            self.succesSauvegarde = true;
          })
          .catch(function(err){})
      },
      /**
       * Annule les modifications et réinitialise les données originales
       */
      reset: function()
      {
        var db = new PouchDB('bdd');
        var self = this;

        db.get(self.nomUtilisateur)
          .then(function(doc)
          {
            self.infos = doc;
          })
          .catch(function(err){});
      }
    },
    created:function()
    {
      this.reset();
    }
  }
</script>
