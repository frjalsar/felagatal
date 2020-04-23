<template>
  <div>
    <h1 class="text-center mb-4">
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Mannvirki
    </h1>

    <EditVenue
      :venue="venue"
      :disabled="disabled"
      :alert="alert"
      @save="save"
    />
  </div>
</template>

<script>
import agent from 'superagent'
import EditVenue from './Edit'
import { getUser, handle401 } from '../user'

export default {
  name: 'VenuesSingle',
  components: {
    EditVenue
  },
  data () {
    return {
      disabled: true,
      alert: {},
      venue: {}
    }
  },
  created () {
    getUser().then(user => {
      this.disabled = !(user && user.id)
    })

    agent
      .get(process.env.FRI_API_URL + '/venues/' + this.$route.params.id)
      .withCredentials()
      .then(res => {
        if (res.body[0]) {
          this.venue = res.body[0]
        } else {
          this.venue = {
            id: '',
            fullName: '',
            indoor: '',
            banked: '',
            straightLanes: '',
            ovalLanes: ''
          }
        }
      })
  },
  methods: {
    save (venue) {
      this.disabled = true
      const method = venue.id ? 'put' : 'post'
      const path = process.env.FRI_API_URL + '/venues'
      return agent(method, path)
        .send(venue)
        .withCredentials()
        .then(res => {
          this.alert = {
            type: 'success',
            msg: 'Uppfærsla tókst'
          }
          setTimeout(() => {
            this.alert = {}
          }, 2000)
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
