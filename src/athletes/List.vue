<template>
  <div>
    <h1 class="text-center mb-4">Iðkendur</h1>
    <SearchPanel
      :regions="regions"
      :clubs="clubs"
      :legacy="legacy"
      :default="settings"
      @change="setQueryParams"
      />
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="d-none d-lg-table-cell">Númer</th>
              <th scope="col">Nafn</th>
              <th scope="col" class="d-none d-md-table-cell">Fæðingarár</th>
              <th scope="col" class="d-none d-md-table-cell">Félag</th>
              <th scope="col" class="d-none d-lg-table-cell">Land</th>
            </tr>
          </thead>
          <tbody>
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
              <td class="d-none d-lg-table-cell">{{ athlete.id }}</td>
              <td>{{ athlete.fullName }}</td>
              <td class="d-none d-md-table-cell">{{ athlete.birthyear }}</td>
              <td class="d-none d-md-table-cell"> {{ athlete.club && athlete.club.fullName }}</td>
              <td class="d-none d-lg-table-cell">{{ athlete.country }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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