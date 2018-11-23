<template>
  <div class="pb-5">
    <b-row class="justify-content-center mb-5">
      <!-- Une journée -->
      <b-col v-for="jour in agenda" class="mb-3" v-if="filtreDate(jour)">
        <div class="bg-primary text-white mb-1">{{jour.date}}</div>
        <b-card-group class="justify-content-center">
          <b-row>
            <!-- Les occupations de la journée -->
            <b-col v-for="activite in jour.occupation">
              <b-card :class="classDynamique(activite.type)" v-if="droit=='lecture'">
                <b-col>{{activite.heureDebut}}</b-col>
                <b-col> {{activite.heureFin}}</b-col>
                <b-col>{{activite.type}}</b-col>
                <b-col >{{activite.motif}}</b-col>
              </b-card>
              <b-card :class="classDynamique(activite.type)" v-if="droit=='modification'">
                <b-input-group prepend="Heure début" class="mb-3">
                  <b-form-input type="time" v-model="activite.heureDebut"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Heure fin" class="mb-3">
                  <b-form-input type="time" v-model="activite.heureFin"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Occupation" class="mb-3">
                  <b-form-select v-model="activite.occupation" :options="listeOccupations"></b-form-select>
                </b-input-group>
                <b-input-group prepend="Motif" v-if="activite.occupation == 'Absence'" class="mb-3">
                  <b-form-select :options="motifsAbsence" v-model="activite.motif"></b-form-select>
                </b-input-group>
              </b-card>
            </b-col>
          </b-row>
        </b-card-group>
      </b-col>
    </b-row>

    <button v-if="droit=='modification'" class="btn btn-ajouter fixed-bottom text-white mr-3 mb-3" v-on:click="afficherModalAjouter=true">
      <span class="fas fa-plus fa-lg"></span>
    </button>

    <!-- Modal pour ajouter une activité -->
    <b-modal title="Ajouter une activité" v-model="afficherModalAjouter">
      <!-- Formulaire -->
      <b-input-group prepend="Date" class="mb-3">
        <b-form-input type="date" v-model="formulaireAjout.date"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Heure début" class="mb-3">
        <b-form-input type="time" v-model="formulaireAjout.heureDebut"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Heure fin" class="mb-3">
        <b-form-input type="time" v-model="formulaireAjout.heureFin"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Occupation" class="mb-3">
        <b-form-select v-model="formulaireAjout.occupation" :options="listeOccupations"></b-form-select>
      </b-input-group>
      <b-input-group prepend="Motif" v-if="formulaireAjout.occupation == 'Absence'" class="mb-3">
        <b-form-select :options="motifsAbsence" v-model="formulaireAjout.motif"></b-form-select>
      </b-input-group>
      <!-- Footer -->
      <div slot="modal-footer" class="w-100">
        <b-btn variant="danger" v-on:click="afficherModalAjouter=false">Annuler</b-btn>
        <b-btn class="ml-5" variant="primary" v-on:click="ajouterOccupation()">Ajouter</b-btn>
      </div>
    </b-modal>
  </div>
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
        afficherModalAjouter: false,
        afficherModifierOccupation: false,
        agenda: [],
        droit: "lecture",
        listeOccupations:
        [
          {value: "Travail", text: "Travail"},
          {value: "Repos hebdomadaire", text: "Repos hebdomadaire"},
          {value: "Absence", text: "Absence"},
          {value: "Congé payé", text: "Congé payé"},
          {value: "Jour férié", text: "Jour férié"},
          {value: "Récupération", text: "Récupération"}
        ],
        motifsAbsence:
        [
          {value: "Maladie", text: "Maladie"},
          {value: "Maladie professionnelle", text: "Maladie professionnelle"},
          {value: "Congé sans solde", text: "Congé sans solde"},
          {value: "Congé maternité", text: "Congé maternité"},
          {value: "Congé paternité", text: "Congé paternité"}
        ],
        formulaireAjout:
        {
          date: "",
          heureDebut: "",
          heureFin: "",
          occupation: "",
          motif: ""
        }
      };
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
        .catch(function(err){});

      db.get("login_info")
        .then(function(doc)
        {
          db.get(doc.login)
            .then(function(doc)
            {
              if(doc.equipe.includes(self.nomUtilisateur))
              {
                self.droit = "modification";
              }
            })
            .catch(function(err){});
        })
        .catch(function(err){});
    },
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
      },
      ajouterOccupation: function()
      {
        var db = new PouchDB('bdd');
        var self = this;

        db.get(self.nomUtilisateur)
          .then(function(doc)
          {
            doc.agenda.forEach(function(journee)
            {
              console.log(moment(journee.date, "DD/MM/YYYY"));console.log(moment(self.formulaireAjout.date, "YYYY-MM-DD"));
              if(moment(journee.date, "DD/MM/YYYY").diff(moment(self.formulaireAjout.date, "YYYY-MM-DD")) == 0)
              {
                journee.occupation.push({
                  heureDebut: self.formulaireAjout.heureDebut,
                  heureFin: self.formulaireAjout.heureFin,
                  type: self.formulaireAjout.occupation,
                  motif: self.formulaireAjout.motif
                });
                console.log(doc);
                db.put(doc);
              }
            });
          })
          .catch(function(err){});

        this.afficherModalAjouter = false;
        this.created();
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

  .btn-ajouter
  {
    border-radius: 100%;
    height: 60px;
    width: 60px;
    left: auto;
    background-color: #ff0000;
    box-shadow: 2px 2px 2px grey;
  }
  .btn-ajouter:hover
  {
    background-color: #b00000;
  }
</style>
