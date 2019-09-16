<template>
  <div>
    <h1>Iðkendur</h1>
    <SearchPanel
      :regions="regions"
      :clubs="clubs"
      :legacy="legacy"
      :default="settings"
      @change="setQueryParams"
      />
    <div class="row">
      <table class="table">
        <tr>
          <th>Númer</th>
          <th>Nafn</th>
          <th>Fæðingarár</th>
          <th>Félag</th>
          <th>Land</th>
        </tr>
        <tr v-if="busy">
          <td colspan="5" align="center">
            <FadeLoader :loading="busy" color="#007bff"></FadeLoader>
          </td>
        </tr>
        <tr
          v-for="athlete in athletes"
          :key="athlete.id"
          @click="onClick && onClick(athlete)"
        >
          <td>{{ athlete.id }}</td>
          <td>{{ athlete.fullName }}</td>
          <td>{{ athlete.birthyear }}</td>
          <td>{{ getCurrentClub(athlete) }}</td>
          <td>{{ athlete.country }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { FadeLoader } from '@saeris/vue-spinners'
import SearchPanel from './SearchPanel'
import agent from 'superagent'

export default {
  name: 'AthletesList',
  components: {
    FadeLoader,
    SearchPanel
  },
  data() {
    return {
      busy: false,
      athletes: [],
      clubs: [],
      regions: [],
      legacy: [],
    }
  },
  methods: {
    getCurrentClub(athlete) {
      if (athlete.membership && athlete.membership.length > 0) {
        const foundClub = athlete.membership.find(m => m.current)
        return foundClub ? foundClub.fullName : ''
      }
      return ''
    },
    setQueryParams (query) {
      this.$router.replace({ query })
      this.search()
    },
    onClick (item) {
      this.$router.push('/idkendur/' + item.id)
    },
    search () {
      this.busy = true
      this.athletes = []
      return agent
        .get(process.env.FRI_API_URL + '/athletes')
        .withCredentials()
        .query(this.$route.query)
        .then(res => {
          this.athletes = res.body
          this.busy = false
        })      
    }
  },
  computed: {
    settings() {
      return this.$route.query
    }
  },
  mounted() {
    this.search()

    agent
      .get(process.env.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body
      })

    agent
      .get(process.env.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body
      })

    agent
      .get(process.env.FRI_API_URL + '/membership/legacy')
      .withCredentials()
      .then(res => {
        this.legacy = res.body
      })
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>