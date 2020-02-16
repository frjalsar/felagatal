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

        <div class="col-md-6 offset-md-3">
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
import Alert from '../alert/Alert'
import agent from 'superagent'

export default {
  name: 'Login',
  components: {
    Alert
  },
  data () {
    return {
      disabled: false,
      errorMsg: '',
      username: '',
      password: ''
    }
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
