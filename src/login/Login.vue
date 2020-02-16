<template>
  <div>
    <h1 class="text-center mb-5">
      Innskráning
    </h1>
    <div class="row mb-4">
      <div class="col-md-10 offset-md-1">
        <Alert
          type="warning"
          :message="errorMsg"
        />

        <div
          v-if="user"
          class="text-center"
        >
          <h4>
            Þú ert: {{ user.fullName }}
          </h4>
          <button
            class="btn btn-large btn-primary center"
            @click="logout"
          >
            Skrá út
          </button>
        </div>

        <div
          v-if="!user"
          class="col-md-6 offset-md-3"
        >
          <div class="form-group">
            <label for="username">Notendanafn:</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              :disabled="disabled"
            >
          </div>
          <div class="form-group">
            <label for="password">Lykilorð:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              :disabled="disabled"
            >
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="disabled"
            @click.prevent="login"
          >
            Innskrá
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '../user'
import Alert from '../alert/Alert'
import agent from 'superagent'

export default {
  name: 'Login',
  components: {
    Alert
  },
  data () {
    return {
      user: undefined,
      disabled: false,
      errorMsg: '',
      username: '',
      password: ''
    }
  },
  created () {
    getUser().then(user => {
      this.user = user
    })
  },
  methods: {
    login () {
      this.disabled = true
      return agent
        .post(process.env.FRI_API_URL + '/user/login')
        .send({
          username: this.username,
          password: this.password
        })
        .withCredentials()
        .then(res => {
          this.disabled = false
          sessionStorage.setItem('FRI_FELAGATAL', JSON.stringify(res.body))
          this.$root.$emit('loggedin', true)
          this.$router.go(-1)
        })
        .catch(e => {
          this.disabled = false
          if (e.status === 401) {
            this.errorMsg = e.response.text
          } else {
            this.errorMsg = 'Villa koma upp'
          }
          setTimeout(() => {
            this.errorMsg = ''
          }, 2000)
        })
    },
    logout () {
      return agent
        .post(process.env.FRI_API_URL + '/user/logout')
        .withCredentials()
        .then(res => {
          this.user = undefined
          sessionStorage.removeItem('FRI_FELAGATAL')
          this.$root.$emit('loggedin', false)
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
