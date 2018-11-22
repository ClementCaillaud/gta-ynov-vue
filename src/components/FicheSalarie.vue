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
  export default
  {
    name: "FicheSalarie",
    props:['utilisateur'],
    data: function()
    {
      return{
        succesSauvegarde: false,
        infos: {}
      }
    },
    methods:
    {
      enregistrer: function()
      {
        for(var champ in this.infos)
        {
          this.utilisateur[champ] = this.infos[champ];
        }
        this.$parent.$emit("modifInfos", this.utilisateur);
        this.succesSauvegarde = true;
      },
      reset: function()
      {
        this.infos =
        {
          nom: this.utilisateur.nom,
          prenom: this.utilisateur.prenom,
          dateNaissance: this.utilisateur.dateNaissance,
          adresse: this.utilisateur.adresse,
          tel: this.utilisateur.tel,
          mail: this.utilisateur.mail
        };
      }
    },
    created:function()
    {
      this.reset();
    }
  }
</script>
