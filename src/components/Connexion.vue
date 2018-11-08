<template>
  <div class="container">
    <div class="row justify-content-center">
      <b-form class="col-md-6">
        <b-form-group>
          <b-form-input type="text" class="form-control" placeholder="Utilisateur" v-model="nom"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" class="form-control" placeholder="Mot de passe" v-model="mdp" :state="etatInput"></b-form-input>
          <b-form-invalid-feedback>Identifiant et/ou mot de passe incorrect(s)</b-form-invalid-feedback>
        </b-form-group>
        <button type="submit" class="btn btn-primary" v-on:click="seConnecter()">Connexion</button>
      </b-form>
    </div>
  </div>
</template>

<script>
  import API from '@/api.js'

  export default
  {
    name: "Connexion",
    data: function()
    {
      return{
        nom: "",
        mdp: "",
        etatInput: null
      };
    },
    methods:
    {
      seConnecter: async function()
      {
        var identifiantsOK = await API.verifierAuthentification(this.nom, this.mdp);
        //var utilisateurBDD = await BDD.getUser(this.nom);
        if(identifiantsOK)//utilisateurBDD.nom == this.nom && utilisateurBDD.mdp == this.mdp)
        {
          this.$router.push("about");
        }
        else
        {
          this.etatInput = false;
        }
      }
    }
  }
</script>
