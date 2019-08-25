<template>
  <div>
    <h1>Innskráning</h1>
    <div class="row mb-4">
      <div class="col-md-10 offset-md-1 card">
        <form class="card-body">
          <Alert type="warning" :message="errorMsg" />

          <div class="col-md-6 offset-md-3" >            
          <div class="form-group row">
            <label
              for="username"
              class="col-sm-4 col-form-label text-right"
            >Notendanafn:</label>
            <div class="col-sm-8">
              <input
                id="username"
                v-model="username"
                type="text"
                class="form-control"
                :disabled="disabled"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="password"
              class="col-sm-4 col-form-label text-right"
            >Lykilorð:</label>
            <div class="col-sm-8">
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                :disabled="disabled"
              >
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="disabled"
            @click.prevent="login"
          >
            Innskrá
          </button>
        </form>
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
      username: '1907834139',
      password: 'Aq1Sw2De'
    }
  },  
  methods: {
    login () {
      this.disabled = true
      return agent
        .post('/login')
        .send({
          username: this.username,
          password: this.password
        })
        .withCredentials()
        .then(res => {
          this.disabled = false
          this.$router.push('/felog')
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
