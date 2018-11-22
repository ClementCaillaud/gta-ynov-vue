<template>
  <b-container>
    <b-row align-v="center" class="mb-2">
      <!-- Filtres -->
      <b-col>
        <b-form-group label="Date début">
          <b-form-input type="date" v-model="filtreDateDebut"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Date fin">
          <b-form-input type="date" v-model="filtreDateFin"></b-form-input>
        </b-form-group>
      </b-col>
      
      <!-- Basculer du mode Agenda au mode Compteur -->
      <b-col md="4">
        <toggle-button id="changed-font"
          :color="{checked: '#3c9631', unchecked: '#388371'}"
          :labels="{checked: 'Agenda', unchecked: 'Compteurs'}"
          :height="35"
          :width="130"
          v-model="afficherCompteurs">
        </toggle-button>
      </b-col>
    </b-row>

    <Compteurs v-if="afficherCompteurs" v-bind:agenda="utilisateur.agenda" v-bind:dateDebut="filtreDateDebut" v-bind:dateFin="filtreDateFin"></Compteurs>
    <Agenda v-if="!afficherCompteurs" v-bind:agenda="utilisateur.agenda" v-bind:dateDebut="filtreDateDebut" v-bind:dateFin="filtreDateFin"></Agenda>

  </b-container>
</template>

<script>
  import Agenda from '@/components/Agenda.vue'
  import Compteurs from '@/components/Compteurs.vue'

  export default
  {
    props:["utilisateur"],
    data: function()
    {
      return{
        filtreDateDebut: "",
        filtreDateFin: "",
        afficherCompteurs: false
      }
    },
    components:
    {
      Agenda,
      Compteurs
    }
  }
</script>

<style scoped>
  .vue-js-switch#changed-font
  {
    font-size: 16px;
  }
</style>
