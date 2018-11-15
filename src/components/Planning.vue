<template>
  <b-container>
    <!-- Filtres -->
    <b-row>
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
    </b-row>

    <!-- Agenda -->
    <b-row class="justify-content-center">
      <!-- Une journée -->
      <b-col v-for="jour in agenda">
        <h1>{{jour.date}}</h1>
        <b-card-group class="justify-content-center">
          <b-row>
            <!-- Les occupations de la journée -->
            <b-col :class="classDynamique(activite.type)" v-for="activite in jour.occupation">
              <b-card>
                <h2>{{activite.heureDebut}} - {{activite.heureFin}}</h2>
                <p>{{activite.type}}</p>
              </b-card>
            </b-col>
          </b-row>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  export default
  {
    name: "Planning",
    data: function()
    {
      return{
        agenda: this.$parent.utilisateur.agenda,
        filtreDateDebut: "",
        filtreDateFin: ""
      }
    },
    methods:
    {
      classDynamique: function(type)
      {
        switch(type)
        {
          case "Travail": return "travail";
          case "Congé": return "conge";
          default: return "";
        }
      }
    }
  }
</script>

<style scoped>
  /* TRAVAIL */
  .travail .card
  {
    border-color: #dc3545;
  }
  .travail p
  {
   background-color: #dc3545;
   color: #ffffff;
  }
  /* CONGE */
  .conge .card
  {
    border-color: #0a8fa7;
  }
  .conge p
  {
   background-color: #0a8fa7;
   color: #ffffff;
  }
</style>
