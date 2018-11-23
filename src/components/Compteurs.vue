<template>

    <b-tabs pills card>
      <!-- Compteurs quotidiens -->
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

      <!-- Compteurs hebdomadaires -->
      <b-tab title="Semaine">
        <b-row>
          <b-col class="compteur" v-for="semaine in compteursHebdomadaire">
            <div class="bg-primary text-white mb-1">{{semaine.nomGroupe}}</div>
            <div :class="classCompteur('hebdomadaire', semaine)">
              {{semaine.heures}}h
              <span v-if="semaine.minutes != 0">{{semaine.minutes}}</span>
            </div>
          </b-col>
        </b-row>
      </b-tab>

      <!-- Compteurs annuels -->
      <b-tab title="Année">
        <b-row>
          <b-col class="compteur" v-for="annee in compteursAnnuel">
            <div class="bg-primary text-white mb-1">{{annee.nomGroupe}}</div>
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
  import PouchDB from 'pouchdb'

  export default
  {
    props:['nomUtilisateur', 'dateDebut', 'dateFin'],
    data: function()
    {
      return{
        agenda: []
      }
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
                if(duree.minutes >= 60)
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
      /**
       * Retourne les compteurs de travail hebdomadaires
       * @return {Array} Les compteurs hebdomadaires
       */
      compteursHebdomadaire: function()
      {
        var compteurs = [];
        var self = this;
        this.regrouper("hebdomadaire").forEach(function(groupe, nomGroupe)
        {
          compteurs.push(self.calculDuree(groupe, nomGroupe));
        });
        return compteurs;
      },
      /**
       * Retourne les compteurs de travail annuels
       * @return {Array} Les compteurs annuels
       */
      compteursAnnuel: function()
      {
        var compteurs = [];
        var self = this;
        this.regrouper("annuel").forEach(function(groupe, nomGroupe)
        {
          compteurs.push(self.calculDuree(groupe, nomGroupe));
        });
        return compteurs;
      }
    },
    created: function()
    {
      var db = new PouchDB('bdd');
      var self = this;

      db.get(self.nomUtilisateur)
        .then(function(doc)
        {
          self.agenda = doc.agenda;
        })
        .catch(function(){});
    },
    methods:
    {
      /**
       * Permet de changer la couleur du compteur lorsque le nombre d'heures est trop élevé
       * @param  {Strign} type     Le type de compteur (quotidien, hebdomadaire ou annuel)
       * @param  {Object} compteur Le nombre d'heures et minutes de ce compteur
       * @return {String}          Le nom de la classe CSS à utiliser
       */
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
      /**
       * Permet de filtrer les journées à prendre en compte dans les compteurs
       * @param  {Object} jour La journée
       * @return {boolean}     TRUE si on doit en tenir compte, FALSE sinon
       */
      filtreDate: function(jour)
      {
        if((moment(jour.date, "DD/MM/YYYY").diff(moment(this.dateDebut, "YYYY-MM-DD"), "days") >= 0 || this.dateDebut == '')
          &&  (moment(jour.date, "DD/MM/YYYY").diff(moment(this.dateFin, "YYYY-MM-DD"), "days") <= 0|| this.dateFin == ''))
        {
          return true;
        }
        return false;
      },
      regrouper: function(type)
      {
        var compteursQuotidien = this.compteursQuotidien;
        var compteursTemp = [];

        compteursQuotidien.forEach(function(journee)
        {
          var groupe = (type=="hebdomadaire") ? moment(journee.date, "DD/MM/YYYY").week() : moment(journee.date, "DD/MM/YYYY").year();
          if(compteursTemp[groupe] === undefined)
          {
            compteursTemp[groupe] = [];
          }
          compteursTemp[groupe].push(journee);
        });
        return compteursTemp;
      },
      calculDuree: function(groupe, nomGroupe)
      {
          var duree = {heures:0, minutes:0};
          groupe.forEach(function(jour)
          {
            duree.heures += jour.heures;
            duree.minutes += jour.minutes;
            if(duree.minutes >= 60)
            {
              duree.heures += parseInt(duree.minutes / 60);
              duree.minutes %= 60;
            }
          });
          return{
            nomGroupe: nomGroupe,
            heures: duree.heures,
            minutes: duree.minutes
          };
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
