<template>
  <div>
    <h1>
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Félag
    </h1>
    <div class="row mb-4">
      <div class="col-md-10 offset-md-1 card">
        <form class="card-body">
          <transition name="fade">
            <div
              v-if="updated"
              class="alert alert-success"
              role="alert"
            >
              Uppfærsla tókst
            </div>
          </transition>

          <div
            v-if="club.id"
            class="form-group row"
          >
            <label
              for="club.id"
              class="col-sm-3 col-form-label text-right"
            >Númer:</label>
            <div class="col-sm-9">
              <input
                id="club.id"
                v-model="club.id"
                type="text"
                readonly
                class="form-control-plaintext"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="club.fullName"
              class="col-sm-3 col-form-label text-right"
            >Fullt nafn:</label>
            <div class="col-sm-9">
              <input
                id="club.fullName"
                v-model="club.fullName"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="club.fullName"
              class="col-sm-3 col-form-label text-right"
            >Stutt nafn:</label>
            <div class="col-sm-9">
              <input
                id="club.fullName"
                v-model="club.shortName"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="club.abbreviation"
              class="col-sm-3 col-form-label text-right"
            >Skammstöfun:</label>
            <div class="col-sm-9">
              <input
                id="club.abbreviation"
                v-model="club.abbreviation"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="club.country"
              class="col-sm-3 col-form-label text-right"
            >Íþróttahérað:</label>
            <div class="col-sm-9">
              <select
                id="club.country"
                v-model="club.regionId"
                class="form-control"
                :disabled="working"
              >
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.fullname }}
                </option>
              </select>
            </div>
          </div>
          <div
            v-if="club.thorId"
            class="form-group row"
          >
            <label
              for="club.id"
              class="col-sm-3 col-form-label text-right"
            >Fiffó kóði:</label>
            <div class="col-sm-9">
              <input
                id="club.id"
                v-model="club.thorId"
                type="text"
                readonly
                class="form-control-plaintext"
                :disabled="working"
              >
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-secondary mt-4"
            :disabled="working"
            @click.prevent="save"
          >
            Vista
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import agent from 'superagent'

export default {
  name: 'Felag',
  data () {
    return {
      working: false,
      updated: null,
      club: {},
      regions: []

    }
  },
  mounted () {
    agent
      .get(process.env.VUE_APP_API_HOST + '/clubs/' + this.$route.params.id)
      .then(res => {
        if (res.body[0]) {
          this.club = res.body[0]
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
      .get(process.env.VUE_APP_API_HOST + '/regions')
      .then(res => {
        this.regions = res.body
      })
  },
  methods: {
    save () {
      this.working = true
      const method = this.club.id ? 'put' : 'post'
      const path = process.env.VUE_APP_API_HOST + '/clubs'
      return agent(method, path)
        .send(this.club)
        .then(res => {
          this.updated = !!res.body.id
          this.working = false
          setTimeout(() => {
            this.updated = false
          }, 2000)
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
