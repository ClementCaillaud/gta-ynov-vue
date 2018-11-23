<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <b-form-group>
          <b-form-input type="text" class="form-control" placeholder="Utilisateur" v-model="login" :state="etatInputLogin"></b-form-input>
          <b-form-invalid-feedback>Utilisateur inconnu</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" class="form-control" placeholder="Mot de passe" v-model="mdp" :state="etatInputMdp"></b-form-input>
          <b-form-invalid-feedback>Mot de passe incorrect</b-form-invalid-feedback>
        </b-form-group>
        <button type="submit" class="btn btn-primary" v-on:click="seConnecter()">Connexion</button>
      </div>
    </div>
  </div>
</template>

<script>
  import PouchDB from 'pouchdb'

  export default
  {
    data: function()
    {
      return{
        login: "",
        mdp: "",
        etatInputMdp: null,
        etatInputLogin: null,
      };
    },
    methods:
    {
      /**
       * Tentative de connexion
       */
      seConnecter: function()
      {
        var self = this;
        var db = new PouchDB('bdd');
        
        db.get(self.login)
          .then(function(doc)
          {
            self.etatInputLogin = null;
            if(self.mdp == doc.mdp)
            {
              //Sauvegarde locale du login et redirection vers la page principale
              db.put({
                _id: "login_info",
                login: doc.login,
                role: doc.role
              }).then(function()
              {
                self.$router.push({name: "gta"});
              });
            }
            else
            {
              self.etatInputMdp = false;
            }
          })
          .catch(function(err)
          {
            self.etatInputLogin = false;
          });
      }
    }
  }
</script>
