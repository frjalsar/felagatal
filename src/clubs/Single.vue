<template>
  <div>
    <h1 class="text-center mb-4">
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Félag
    </h1>    
    <EditClub
      :club="club"
      :regions="regions"
      :disabled="disabled"
      :readonly="readonly"
      :alert="alert"
      @save="save"
    />    
  </div>
</template>

<script>
// @ is an alias to /src
import agent from 'superagent'
import EditClub from './Edit'
import { handle401, hasAccess } from '../user'

export default {
  name: 'ClubsSingle',
  components: {
    EditClub    
  },
  data () {
    return {      
      disabled: false,
      alert: {},
      club: {},
      regions: [],
      readonly: true,
    }
  },
  mounted () {
    agent
      .get(process.env.FRI_API_URL + '/clubs/' + this.$route.params.id)
      .withCredentials()
      .then(res => {
        if (res.body[0]) {
          this.club = res.body[0]
          this.readonly = false
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

    agent
      .get(process.env.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body.map(region => ({
          value: region.id,
          text: region.fullName
        }))
      })
  },
  methods: {
    save (club) {
      this.disabled = true
      const method = club.id ? 'put' : 'post'
      const path = process.env.FRI_API_URL + '/clubs'
      return agent(method, path)
        .send(club)
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
