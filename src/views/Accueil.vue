<template>
  <div class="mt-5">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Bienvenue sur gta-ynov-vue</h1>
    <Connexion></Connexion>
  </div>
</template>


<script>
  import Connexion from "@/components/Connexion.vue";
  export default
  {
    name: "accueil",
    components:
    {
      Connexion
    }
  }
</script>
