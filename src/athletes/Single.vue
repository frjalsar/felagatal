<template>
  <div>
    <h1>
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Iðkandi
    </h1>
    <div class="row mb-4">      
      <EditAthlete
        :athlete="athlete"
        :clubs="clubs"
        :countries="countries"
        :genders="genders"
        :disabled="disabled"
        :alert="alert"
        @save="save"
      />      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import agent from 'superagent'
import EditAthlete from './Edit'

export default {
  name: 'AthletesSingle',
  components: {
    EditAthlete
  },
  data () {
    return {            
      disabled: false,
      alert: {},
      athlete: {},
      clubs: [],
      countries: [],
      genders: [{
        value: 1,
        text: 'Karl'
      }, {
        value: 2,
        text: 'Kona'
      }]
    }
  },
  mounted () {    
    agent
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {        
        this.countries = res.body.map(country => ({          
          value: country.alpha3Code,
          text: country.nativeName                   
        }))
      })
      .then(() => {
        agent
        .get(process.env.FRI_API_URL + '/athletes/' + this.$route.params.id)
        .withCredentials()
        .then(res => {
          if (res.body[0]) {
            this.athlete = res.body[0]
          } else {
            this.club = {
              id: 0,
              fullName: '',
              shortName: '',
              abbreviation: '',
              regionId: 0,
              thorId: null
            }
          }
        })
      })

    agent
      .get(process.env.FRI_API_URL + '/clubs/')
      .withCredentials()
      .then(res => {
        this.clubs = res.body
      })
  },
  methods: {
    save (athlete) {
      console.log(athlete)
      this.disabled = true
      const method = athlete.id ? 'put' : 'post'
      const path = process.env.FRI_API_URL + '/athletes'
      return agent(method, path)
        .send(athlete)
        .withCredentials()
        .then(res => {        
          this.alert = {
            type: 'success',
            msg: 'Uppfærsla tókst'
          }
          setTimeout(() => {
            this.alert = {}
          },800)
          this.disabled = false          
        })
    }
  }
}
</script>

<style scoped>
h1 i {
  cursor: pointer;
  padding-right: 10px
}

.fa-check-circle {
  color: #ccc;
  font-size: 20px;
}

.fa-check-circle.verified {
  color: #c3e6cb
}
</style>
