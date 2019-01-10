<template>
  <div>
    <h1><i class="fas fa-arrow-left" @click="$router.go(-1)"></i> Iðkandi</h1>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2 card">
        <form class="card-body">
          <div class="form-group row">
            <label for="athlete.id" class="col-sm-2 col-form-label text-right">Númer:</label>
            <div class="col-sm-9">
              <input type="text" readonly class="form-control-plaintext" id="athlete.id" v-model="athlete.id" >
            </div>
            <div class="col-sm-1 py-2">
              <i class="fas fa-check-circle" :class="{ verified: athlete.verified }"></i>
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.fullName" class="col-sm-2 col-form-label text-right">Fullt nafn:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.fullName" v-model="athlete.fullName">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.ssnr" class="col-sm-2 col-form-label text-right">Kennitala:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.ssnr" v-model="athlete.ssnr">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.birthyear" class="col-sm-2 col-form-label text-right">Fæðingarár:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.ssnr" v-model="athlete.birthyear">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.country" class="col-sm-2 col-form-label text-right">Þjóðerni:</label>
            <div class="col-sm-10">
              <select class="form-control" id="athlete.cou ntry" v-model="athlete.country">
                <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2 pt-0 text-right">Kyn:</legend>
            <div class="col-sm-10 text-left">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="athlete.gender" id="athlete.gender1" value="1" v-model="athlete.gender">
                <label class="form-check-label" for="athlete.gender1">Karl</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="athlete.gender" id="athlete.gender2" value="2" v-model="athlete.gender">
                <label class="form-check-label" for="athlete.gender2">Kona</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="athlete.gender" id="athlete.gender3" value="0" v-model="athlete.gender">
                <label class="form-check-label" for="athlete.gender3">Á ekki við</label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.id" class="col-sm-2 col-form-label text-right">Fiffó númer:</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="athlete.id" v-model="athlete.thorId">
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2 text-right">Félagasaga:</legend>
            <div class="col-sm-10 text-left">
              <div class="form-row py-1" v-for="(club,index) in athlete.clubs" :key="club.id">
                <div class="col-md-5">
                  <select class="form-control" id="" v-model="club.id">
                    <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.fullname}}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" placeholder="Fra" v-model="club.from">
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" placeholder="Til"  v-model="club.to">
                </div>
                <div class="col-md-1">
                  <button class="btn btn-default" @click.prevent="removeClub(index)">-</button>
                </div>
              </div>
              <div class="form-row py-1">
                <div class="col-md-1 offset-md-11">
                  <button class="btn btn-default" @click.prevent="addClub">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-2 text-right">Yfirfarið:</div>
            <div class="col-sm-10 text-left">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="athlete.verified" v-model="athlete.verified">
                <label class="form-check-label" for="athlete.verified">Staðfesta að öll gögn og félagasaga séu rétt.</label>
              </div>
            </div>
          </div>
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
      athlete: {},
      countries: [],
      clubs: []
    }
  },
  methods: {
    removeClub (index) {
      this.athlete.clubs.splice(index, 1)
    },
    addClub () {
      this.athlete.clubs.push({
        id: 0,
        to: '',
        from: ''
      })
      console.log(this.athlete.clubs)
    }
  },
  mounted () {
    agent
      .get('https://frjalsar.azurewebsites.net/athletes/' + this.$route.params.id)
      .then(res => {
        this.athlete = res.body[0]
      })

    agent
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        this.countries = res.body.map(country => ({
          name: country.nativeName,
          code: country.alpha3Code
        }))
      })

    agent
      .get('https://frjalsar.azurewebsites.net/clubs/')
      .then(res => {
        this.clubs = res.body
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
  color: #ccc
}

.fa-check-circle.verified {
  color: #006400
}
</style>
