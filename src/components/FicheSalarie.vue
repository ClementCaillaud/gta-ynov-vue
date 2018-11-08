<template>
  <b-container>
    <b-row>
      <b-col md="6">
        <b-form-group label="Nom">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group label="Prénom">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group label="Date de naissance">
          <b-form-input></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Adresse">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group label="N° téléphone">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group label="Mail">
          <b-form-input></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <button class="btn btn-success">Enregistrer modifications</button>
  </b-container>
</template>

<script>
  export default
  {
    name: "FicheSalarie"
  }
</script>
