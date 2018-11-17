<template>
  <b-row class="justify-content-center">
    <!-- Une journée -->
    <b-col v-for="jour in agenda" class="mb-3">
      <div class="bg-primary text-white mb-1">{{jour.date}}</div>
      <b-card-group class="justify-content-center">
        <b-row>
          <!-- Les occupations de la journée -->
          <b-col v-for="activite in jour.occupation">
            <b-card :class="classDynamique(activite.type)">
              <b-col>{{activite.heureDebut}}</b-col>
              <b-col> {{activite.heureFin}}</b-col>
              <b-col>{{activite.type}}</b-col>
              <b-col >{{activite.motif}}</b-col>
            </b-card>
          </b-col>
        </b-row>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
  export default
  {
    name: "Agenda",
    data: function()
    {
      return{
        agenda: this.$parent.$parent.utilisateur.agenda
      };
    },
    methods:
    {
      classDynamique: function(type)
      {
        switch(type)
        {
          case "Travail": return "travail";
          case "Congé payé": return "conge-paye";
          case "Absence": return "absence";
          case "Repos hebdomadaire": return "repos-hebdo";
          case "Jour férié": return "ferie";
          case "Récupération": return "recuperation";
          default: return "";
        }
      }
    }
  }
</script>

<style scoped>
  .travail
  {
    background-color: #dc3545;
    color: #ffffff;
  }
  .conge-paye
  {
    background-color: #0f8ca2;
    color: #ffffff;
  }
  .absence
  {
    background-color: #35577b;
    color: #ffffff;
  }
  .repos-hebdo
  {
    background-color: #969696;
    color: #ffffff;
  }
  .ferie
  {
    background-color: #179642;
    color: #ffffff;
  }
  .recuperation
  {
    background-color: #e26426;
    color: #ffffff;
  }
</style>
