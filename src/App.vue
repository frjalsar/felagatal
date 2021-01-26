<template>
  <div id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <a href="/#/">
        <img
          alt="Frjálsíþróttasamband Íslands"
          src="./assets/logo.png"
          class="logo"
        >
      </a>
      <a
        href="/#/"
        class="mr-md-auto title-link"
      >
        <h5 class="my-0 font-weight-normal">
          Félagatal FRÍ
        </h5>
      </a>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link
          to="/idkendur"
          class="p-2 text-dark"
        >
          Iðkendur
        </router-link>
        <router-link
          to="/felog"
          class="p-2 text-dark"
        >
          Félög
        </router-link>
        <router-link
          to="/herud"
          class="p-2 text-dark"
        >
          Íþróttahéruð
        </router-link>

        <router-link
          to="/domarar"
          class="p-2 text-dark"
        >
          Dómarar
        </router-link>

        <router-link
          to="/mannvirki"
          class="p-2 text-dark"
        >
          Mannvirki
        </router-link>
      </nav>
      <router-link
        v-if="!user"
        to="/login"
        class="btn btn-outline-primary"
      >
        Innskráning
      </router-link>

      <a
        v-if="user"
        class="btn btn-outline-secondary"
        @click="logout"
      >
        {{ user.fullName }}
      </a>
    </div>
    <div class="container">
      <div class="my-5 p-3 bg-white rounded shadow">
        <router-view :user="user" />
      </div>
    </div>
  </div>
</template>

<style>
img.logo {
  margin-right: 10px;
  width: 50px
}
h1 {
  text-transform: uppercase;
}
</style>

<script>
import { getUser } from './user'
import agent from 'superagent'
export default {
  name: 'App',
  data () {
    return {
      user: undefined
    }
  },
  created () {
    getUser().then(user => {
      this.user = user
    })
  },
  mounted () {
    // This feels hacky
    this.$root.$on('loggedin', (val) => {
      this.user = val
    })
  },
  methods: {
    logout () {
      agent
        .post(process.env.FRI_API_URL + '/user/logout')
        .withCredentials()
        .then(res => {
          sessionStorage.removeItem('FRI_FELAGATAL')
          this.$root.$emit('loggedin', false)
        })
    }
  }
}
</script>
<style>
a.title-link {
  text-decoration: none;
  color: #343a40;
}

</style>
