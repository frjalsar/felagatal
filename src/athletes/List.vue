<template>
  <div>
    <h1>Iðkendur</h1>
    <div class="row mb-4">
      <div class="col-md-12">
        <a class="btn btn-sm" v-for="letter in alphabet" :key="letter" @click="letterSearch(letter)">
          {{ letter }}
        </a>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <input
          type="text"
          v-model="query.search"
          class="form-control text-center"
          placeholder="Leita"
          @keyup="search"
        >
      </div>
      <div class="col-md-3">
        <select
          v-model="query.regionId"
          class="form-control"
          @change="search"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Íþróttahérað
          </option>
          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
          {{ region.fullName }} 
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select
          v-model="query.clubId"
          class="form-control"
          @change="search"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Félag
          </option>
          <option
            v-for="club in filteredClub"
            :key="club.id"
            :value="club.id"
          >
          {{ club.fullName }} 
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select
          v-model="query.legacyClub"
          class="form-control"
          @change="search"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Gömul félagaskráning
          </option>
          <option
            v-for="club in legacy"
            :key="club"
            :value="club"
          >
          {{ club }} 
          </option>
        </select>
      </div>
    </div>
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
          <td>{{ athlete.club && athlete.club.fullName }}</td>
          <td>{{ athlete.country }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { FadeLoader } from '@saeris/vue-spinners'
import agent from 'superagent'

export default {
  name: 'AthletesList',
  components: {
    FadeLoader
  },
  data() {
    return {
      busy: false,
      athletes: [],
      clubs: [],
      regions: [],
      legacy: [],
      loadCount: 0,
      query: {
        search: undefined,
        regionId: undefined,
        clubId: undefined,
        legacyClub: undefined
      },      
      alphabet: ['A', 'Á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z', 'Þ', 'Æ', 'Ö'],
    }
  },
  computed: {
    filteredClub() {
      if (this.query.regionId > 0) {
        return this.clubs.filter(club => club.regionId === this.query.regionId)
      } else {
        return this.clubs
      }
    },
    emptySearch() {
      return !(this.query.search || this.query.regionId || this.query.clubId || this.query.legacyClub || this.query.startsWith)
    }
  },
  methods: {
    onClick (item) {
      this.$router.push('/idkendur/' + item.id)
    },
    letterSearch(letter) {
      this.query = {
        startsWith: letter
      }
      return this.search().then(() => {
        this.query.startsWith = undefined
      })
    },
    search () {
      this.busy = true
      this.athletes = []
      if (this.emptySearch) {        
        return Promise.resolve([]).then(res => {
          this.athletes = res
          this.busy = false
        })       
      }
      return agent
        .get(process.env.FRI_API_URL + '/athletes')
        .withCredentials()
        .query(this.query)
        .then(res => {
          this.athletes = res.body

          this.busy = false
        })      
    }
  },
  mounted() {
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