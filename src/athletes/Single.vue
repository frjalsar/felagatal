<template>
  <div>
    <h1 class="text-center mb-5">
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Iðkandi
    </h1>
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
</template>

<script>
import agent from 'superagent'
import EditAthlete from './Edit'
import { getUser, handle401 } from '../user'

export default {
  name: 'AthletesSingle',
  components: {
    EditAthlete
  },
  data () {
    return {
      disabled: true,
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
  created () {
    console.log('athlete created')
    this.disabled = !getUser()

    agent
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        this.countries = res.body.map(country => ({
          value: country.alpha3Code,
          text: country.nativeName
        }))

        this.countries.unshift({
          value: undefined,
          text: 'Velja land'
        })
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

          agent
            .get(process.env.FRI_API_URL + '/athletes/' + this.$route.params.id)
            .withCredentials()
            .then(res => {
              this.athlete = res.body[0]
            })

          setTimeout(() => {
            this.alert = {}
          }, 800)
          this.disabled = false
        })
        .catch(e => {
          this.alert = handle401(e)
          throw e
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
