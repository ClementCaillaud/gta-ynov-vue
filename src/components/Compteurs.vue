<template>

    <b-tabs pills card>
      <b-tab title="Jour" active>
        Compteurs quotidiens
        <div v-for="journee in compteursQuotidien">
          {{journee.date}}
          {{journee.heures}}
          {{journee.minutes}}
        </div>
      </b-tab>
      <b-tab title="Semaine">
        Compteurs hebdomadaires
      </b-tab>
      <b-tab title="Année">
        Compteurs annuels
      </b-tab>
    </b-tabs>

</template>

<script>
  import moment from 'moment'

  export default
  {
    name: "Compteurs",
    data: function()
    {
      return{
        agenda: this.$parent.$parent.utilisateur.agenda
      };
    },
    computed:
    {
      /**
       * Retourne les compteurs de trvail jour par jour
       * @return {Array} Les compteurs quotidiens
       */
      compteursQuotidien: function()
      {
        var compteurs = [];
        //Pour chaque jour
        this.agenda.forEach(function(journee)
        {
          var duree = moment("00:00", "HH:mm");
          //On regarde chaque occupation
          journee.occupation.forEach(function(occupation)
          {
            //On ajoute le temps de travail au compteur
            if(occupation.type == "Travail")
            {
              var dureeTravail = moment.duration(moment(occupation.heureFin, "HH:mm").diff(moment(occupation.heureDebut, "HH:mm")));
              duree.add(dureeTravail.hours(), "h");
              duree.add(dureeTravail.minutes(), "m");
            }
          });
          compteurs.push({
            date: journee.date,
            heures: duree.hours(),
            minutes: duree.minutes()
          });
        });
        return compteurs;
      }
    }
  }
</script>

<style scoped>

</style>
