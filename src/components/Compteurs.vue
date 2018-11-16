<template>

    <b-tabs pills card>
      <b-tab title="Jour" active>
        <b-row>
          <b-col class="compteur" v-for="journee in compteursQuotidien">
            <div class="bg-primary text-white mb-1">{{journee.date}}</div>
            <div>
              {{journee.heures}}h
              <span v-if="journee.minutes != 0">{{journee.minutes}}</span>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Semaine">
        <b-row>
          <b-col class="compteur" v-for="semaine in compteurHebdomadaire">
            <div class="bg-primary text-white mb-1">{{semaine.numSemaine}}</div>
            <div>
              {{semaine.heures}}h
              <span v-if="semaine.minutes != 0">{{semaine.minutes}}</span>
            </div>
          </b-col>
        </b-row>
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
      },
      compteurHebdomadaire: function()
      {
        var compteursQuotidien = this.compteursQuotidien;
        var compteurs = [];
        var compteursTemp = [];

        //Regroupement par semaine
        compteursQuotidien.forEach(function(journee)
        {
          var semaine = moment(journee.date, "DD/MM/YYYY").week();
          if(compteursTemp[semaine] === undefined)
          {
            compteursTemp[semaine] = [];
          }
          compteursTemp[semaine].push(journee);
        });

        //Calcul des durées
        compteursTemp.forEach(function(semaine, numSemaine)
        {
          var duree = moment("00:00", "HH:mm");
          semaine.forEach(function(jour)
          {
            duree.add(jour.heures, "h");
            duree.add(jour.minutes, "m");
          });
          compteurs.push({
            numSemaine: numSemaine,
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
  .compteur-ok
  {

  }
  .compteur-pas-ok
  {

  }
</style>
