<template>
  <div>
    <b-row class="justify-content-center">
      <!-- Une journée -->
      <b-col v-for="jour in agenda" class="mb-3" v-if="filtreDate(jour)">
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
  </div>
</template>

<script>
  import moment from 'moment'

  export default
  {
    props:['agenda', 'dateDebut', 'dateFin', 'droits'],
    methods:
    {
      /**
       * Détermine la classe CSS à utiliser en fonction du type d'occupation
       * @param  {String} type Le type d'occupation
       * @return {String}      Le nom de la classe à utiliser
       */
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
      },
      /**
       * Filtre les journées en fonction des datepickers
       * @param  {Object} jour Le jour de l'agenda
       * @return {boolean}      TRUE si on doit afficher cette journée, FALSE sinon
       */
      filtreDate: function(jour)
      {
        if((moment(jour.date, "DD/MM/YYYY").diff(moment(this.dateDebut, "YYYY-MM-DD"), "days") >= 0 || this.dateDebut == '')
          &&  (moment(jour.date, "DD/MM/YYYY").diff(moment(this.dateFin, "YYYY-MM-DD"), "days") <= 0|| this.dateFin == ''))
        {
          return true;
        }
        return false;
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
