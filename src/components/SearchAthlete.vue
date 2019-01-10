<template>
  <div >
    <h1>Iðkendur</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input type="text" class="form-control text-center" id="firstName" placeholder="Nafn iðkanda" value="" @keyup="search" >
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th>Númer</th>
          <th>Nafn</th>
          <th>Fæðingarár</th>
          <th>Land</th>
          <th></th>
        </tr>
        <tr v-for="athlete in list" :key="athlete.id" @click="goToAthlete(athlete.id)">
          <td>{{ athlete.id }}</td>
          <td>{{ athlete.fullName }}</td>
          <td>{{ athlete.birthyear }}</td>
          <td>{{ athlete.country }}</td>
          <td><i class="fas fa-check-circle" :class="{ verified: athlete.verified }"></i></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'
import debounce from 'lodash.debounce'
export default {
  name: 'SearchAthlete',
  props: {
    msg: String
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    goToAthlete (athleteId) {
      this.$router.push({
        name: 'athlete',
        params: { id: athleteId }
      })
    },
    search: debounce(function (e) {
      return agent
        .get('https://frjalsar.azurewebsites.net/athletes')
        .query({ search: e.target.value })
        .then(res => {
          this.list = res.body
        })
    }, 200)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-transform: uppercase
}
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
.fa-check-circle {
  color: #ccc
}

.fa-check-circle.verified {
  color: #006400
}
</style>
