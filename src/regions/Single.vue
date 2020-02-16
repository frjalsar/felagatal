<template>
  <div>
    <h1 class="text-center mb-5">
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Íþróttahérað
    </h1>
    <EditRegion
      :region="region"
      :disabled="disabled"
      :alert="alert"
      @save="save"
    />
  </div>
</template>

<script>
import agent from 'superagent'
import EditRegion from './Edit'
import { getUser, handle401 } from '../user'

export default {
  name: 'RegionsSingle',
  components: {
    EditRegion
  },
  data () {
    return {
      disabled: true,
      alert: {},
      region: {}
    }
  },
  created () {
    getUser().then(user => {
      this.disabled = !(user && user.id)
    })

    agent
      .get(process.env.FRI_API_URL + '/regions/' + this.$route.params.id)
      .withCredentials()
      .then(res => {
        if (res.body[0]) {
          this.region = res.body[0]
        } else {
          this.region = {
            id: 0,
            fullName: '',
            abbreviation: ''
          }
        }
      })
  },
  methods: {
    save (region) {
      this.disabled = true
      const method = region.id ? 'put' : 'post'
      const path = process.env.FRI_API_URL + '/regions'
      return agent(method, path)
        .send(region)
        .withCredentials()
        .then(res => {
          this.alert = {
            type: 'success',
            msg: 'Uppfærsla tókst'
          }
          this.disabled = false
          setTimeout(() => {
            this.alert = {}
          }, 800)
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
