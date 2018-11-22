<template>

    <b-tabs pills card>
      <b-tab title="Jour" active>
        <b-row>
          <b-col class="compteur" v-for="journee in compteursQuotidien">
            <div class="bg-primary text-white mb-1">{{journee.date}}</div>
            <div :class="classCompteur('quotidien', journee)">
              {{journee.heures}}h
              <span v-if="journee.minutes != 0">{{journee.minutes}}</span>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Semaine">
        <b-row>
          <b-col class="compteur" v-for="semaine in compteursHebdomadaire">
            <div class="bg-primary text-white mb-1">{{semaine.numSemaine}}</div>
            <div :class="classCompteur('hebdomadaire', semaine)">
              {{semaine.heures}}h
              <span v-if="semaine.minutes != 0">{{semaine.minutes}}</span>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Année">
        <b-row>
          <b-col class="compteur" v-for="annee in compteursAnnuel">
            <div class="bg-primary text-white mb-1">{{annee.numAnnee}}</div>
            <div :class="classCompteur('annuel', annee)">
              {{annee.heures}}h
              <span v-if="annee.minutes != 0">{{annee.minutes}}</span>
            </div>
          </b-col>
        </b-row>
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
      dateDebut: function(){return this.$parent.filtreDateDebut;},
      dateFin: function(){return this.$parent.filtreDateFin;},
      /**
       * Retourne les compteurs de trvail jour par jour
       * @return {Array} Les compteurs quotidiens
       */
      compteursQuotidien: function()
      {
        var compteurs = [];
        var self = this;
        //Pour chaque jour
        this.agenda.forEach(function(journee)
        {
          if(self.filtreDate(journee))
          {
            var duree = {heures:0, minutes:0};
            //On regarde chaque occupation
            journee.occupation.forEach(function(occupation)
            {
              //On ajoute le temps de travail au compteur
              if(occupation.type == "Travail")
              {
                var dureeTravail = moment.duration(moment(occupation.heureFin, "HH:mm").diff(moment(occupation.heureDebut, "HH:mm")));
                duree.heures += dureeTravail.hours();
                duree.minutes += dureeTravail.minutes();
                if(duree.minutes > 60)
                {
                  duree.heures += parseInt(duree.minutes / 60);
                  duree.minutes %= 60;
                }
              }
            });
            compteurs.push({
              date: journee.date,
              heures: duree.heures,
              minutes: duree.minutes
            });
          }
        });
        return compteurs;
      },
      compteursHebdomadaire: function()
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
          var duree = {heures:0, minutes:0};
          semaine.forEach(function(jour)
          {
            duree.heures += jour.heures;
            duree.minutes += jour.minutes;
            if(duree.minutes > 60)
            {
              duree.heures += parseInt(duree.minutes / 60);
              duree.minutes %= 60;
            }
          });
          compteurs.push({
            numSemaine: numSemaine,
            heures: duree.heures,
            minutes: duree.minutes
          });
        });
        return compteurs;
      },
      compteursAnnuel: function()
      {
        var compteursQuotidien = this.compteursQuotidien;
        var compteurs = [];
        var compteursTemp = [];

        //Regroupement par année
        compteursQuotidien.forEach(function(journee)
        {
          var annee = moment(journee.date, "DD/MM/YYYY").year();
          if(compteursTemp[annee] === undefined)
          {
            compteursTemp[annee] = [];
          }
          compteursTemp[annee].push(journee);
        });

        //Calcul des durées
        compteursTemp.forEach(function(annee, numAnnee)
        {
          var duree = {heures:0, minutes:0};
          annee.forEach(function(jour)
          {
            duree.heures += jour.heures;
            duree.minutes += jour.minutes;
            if(duree.minutes > 60)
            {
              duree.heures += parseInt(duree.minutes / 60);
              duree.minutes %= 60;
            }
          });
          compteurs.push({
            numAnnee: numAnnee,
            heures: duree.heures,
            minutes: duree.minute
          });
        });
        return compteurs;
      }
    },
    methods:
    {
      classCompteur: function(type, compteur)
      {
        var seuil = 0;

        switch(type)
        {
          case "quotidien": seuil = 12;
            break;
          case "hebdomadaire": seuil = 44;
            break;
          default: return "compteur-ok";
        }

        if(compteur.heures > seuil)
        {
          return "compteur-pas-ok";
        }
        return "compteur-ok";
      },
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
  .compteur-ok
  {

  }
  .compteur-pas-ok
  {
    background-color: #b90505;
    color: white;
  }
</style>
