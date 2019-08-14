<template>
  <div>
    <h1>
      Innskráning
    </h1>
    <div class="row mb-4">
      <div class="col-md-10 offset-md-1 card">
        <form class="card-body">          
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
                :disabled="working"
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
                :disabled="working"
              >
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="working"
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
// @ is an alias to /src
import { setCookie } from 'tiny-cookie'
import agent from 'superagent'

export default {
  name: 'Felag',
  data () {
    return {
      working: false,
      username: '1907834139',
      password: 'Aq1Sw2De'
    }
  },  
  methods: {
    login () {
      this.working = true
      const path = process.env.FRI_API_URL + '/login'
      return agent
        .post(path)
        .send({
          username: this.username,
          password: this.password
        })
        .withCredentials()
        .then(res => {
          this.working = false
          setCookie(
            'FRI_FELAGATAL',
            btoa(JSON.stringify(res.body)),
            {
              'domain': '.fri.is',
              'max-age': 7 * 24 * 60 * 60 * 1000,
              'samesite': 'strict',
              'secure': process.env.NODE_ENV === 'production'
            }
          )
          this.$router.push('/felog')
        })
    }
  }
}
</script>

<style>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
