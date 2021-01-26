<template>
  <div>
    <h1 class="text-center mb-4">
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Dómarar
    </h1>

    <EditJudge
      :judge="judge"
      :clubs="clubs"
      :disabled="disabled"
      :alert="alert"
      @save="save"
    />
  </div>
</template>

<script>
import agent from 'superagent'
import EditJudge from './Edit'
import { getUser, handle401 } from '../user'

export default {
  name: 'JudgesSingle',
  components: {
    EditJudge
  },
  data () {
    return {
      disabled: true,
      alert: {},
      judge: {},
      clubs: []
    }
  },
  created () {
    getUser().then(user => {
      this.disabled = !(user && user.id)
    })

    agent
      .get(process.env.FRI_API_URL + '/judges/' + this.$route.params.id)
      .withCredentials()
      .then(res => {
        if (res.body[0]) {
          this.judge = res.body[0]
        } else {
          this.judge = {
            id: 0,
            fullName: '',
            date: '',
            clubId: ''
          }
        }
      })

    agent
      .get(process.env.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body.map(club => ({
          value: club.id,
          text: club.fullName
        }))
      })
  },
  methods: {
    save (judge) {
      this.disabled = true
      const method = judge.id ? 'put' : 'post'
      const path = process.env.FRI_API_URL + '/judges'
      return agent(method, path)
        .send(judge)
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
