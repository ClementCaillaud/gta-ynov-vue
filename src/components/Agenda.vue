<template>
  <b-container>
    <b-row>
      <b-col v-for="jour in planning">
        <h1>{{jour.date}}</h1>
        <b-card-group columns>
          <b-card v-for="activite in jour.occupation">
            <h2>{{activite.heureDebut}} - {{activite.heureFin}}</h2>
            <p>{{activite.type}}</p>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  export default
  {
    name: "Agenda",
    data: function()
    {
      return{
        planning:
        [
          {
            date: "09/11/2018",
            occupation:
            [
              {
                  heureDebut: "08:00",
                  heureFin: "12:00",
                  type: "Travail"
              },
              {
                  heureDebut: "13:30",
                  heureFin: "18:00",
                  type: "Travail"
              }
            ]
          },
          {
            date: "10/11/2018",
            occupation:
            [
              {
                  heureDebut: "08:00",
                  heureFin: "18:00",
                  type: "Congé"
              }
            ]
          }
        ]
      }
    }
  }
</script>
