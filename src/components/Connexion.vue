<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <b-form-group>
          <b-form-input type="text" class="form-control" placeholder="Utilisateur" v-model="login"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" class="form-control" placeholder="Mot de passe" v-model="mdp" :state="etatInput"></b-form-input>
          <b-form-invalid-feedback>Identifiant et/ou mot de passe incorrect(s)</b-form-invalid-feedback>
        </b-form-group>
        <button type="submit" class="btn btn-primary" v-on:click="seConnecter()">Connexion</button>
      </div>
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
        login: "",
        mdp: "",
        etatInput: null
      };
    },
    methods:
    {
      seConnecter: async function()
      {
        //On vérifie côté "serveur" que le login et le mdp sont bons
        var identifiantsOK = await API.verifierAuthentification(this.login, this.mdp);

        if(identifiantsOK)
        {
          //Sauvegarde locale du login et redirection vers la page principale
          this.$parent.$emit('connexion', this.login);
          this.$router.push({name: "gta"});
        }
        else
        {
          this.etatInput = false;
        }
      }
    }
  }
</script>
