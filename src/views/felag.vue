<template>
  <div>
    <h1><i class="fas fa-arrow-left" @click="$router.go(-1)"></i> Félag</h1>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2 card">
        <form class="card-body">
          <transition name="fade">
            <div class="alert alert-success" role="alert" v-if="updated">
              Uppfærsla tókst
            </div>
          </transition>

          <div class="form-group row">
            <label for="club.id" class="col-sm-3 col-form-label text-right">Númer:</label>
            <div class="col-sm-9">
              <input type="text" readonly class="form-control-plaintext" id="club.id" v-model="club.id">
            </div>
          </div>
          <div class="form-group row">
            <label for="club.fullName" class="col-sm-3 col-form-label text-right">Fullt nafn:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="club.fullName" v-model="club.fullName" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <label for="club.fullName" class="col-sm-3 col-form-label text-right">Stutt nafn:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="club.fullName" v-model="club.shortName" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <label for="club.abbreviation" class="col-sm-3 col-form-label text-right">Skammstöfun:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="club.abbreviation" v-model="club.abbreviation" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <label for="club.country" class="col-sm-3 col-form-label text-right">Íþróttahérað:</label>
            <div class="col-sm-9">
              <select class="form-control" id="club.country" v-model="club.province.id" :disabled="working">
                <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.fullname }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="club.id" class="col-sm-3 col-form-label text-right">Fiffó kóði:</label>
            <div class="col-sm-9">
              <input type="text" readonly class="form-control-plaintext" id="club.id" v-model="club.thorId" :disabled="working">
            </div>
          </div>
          <button type="submit" class="btn btn-secondary mt-4" @click.prevent="update" :disabled="working">Vista</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import agent from 'superagent'

export default {
  name: 'idkandi',
  data () {
    return {
      working: false,
      updated: null,
      club: {},
      provinces: []

    }
  },
  methods: {
    update () {
      this.working = true
      return agent
        .put(process.env.VUE_APP_API_HOST + '/clubs')
        .send(this.club)
        .then(res => {
          this.updated = !!res.body.id
          this.working = false
          setTimeout(() => {
            this.updated = false
          }, 2000)
        })
    }
  },
  mounted () {
    agent
      .get(process.env.VUE_APP_API_HOST + '/clubs/' + this.$route.params.id)
      .then(res => {
        this.club = res.body[0]
      })

    agent
      .get(process.env.VUE_APP_API_HOST + '/provinces/')
      .then(res => {
        this.provinces = res.body
      })
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
