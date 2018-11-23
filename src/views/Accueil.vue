<template>
  <div class="mt-5">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Bienvenue sur gta-ynov-vue</h1>
    <Connexion></Connexion>
  </div>
</template>


<script>
  import Connexion from "@/components/Connexion.vue";
  import PouchDB from 'pouchdb'

  export default
  {
    components:
    {
      Connexion
    },
    created: function()
    {
      var db = new PouchDB('bdd');
      db.get('login_info').then(function(doc)
      {
        db.remove(doc);
      }).catch(function(err){})
    }
  }
</script>
