<template>
  <div>
    <h1><i class="fas fa-arrow-left" @click="$router.go(-1)"></i> Iðkandi</h1>
    <div class="row mb-4">
      <div class="col-md-8 offset-md-2 card">
        <form class="card-body">
          <transition name="fade">
            <div class="alert alert-success" role="alert" v-if="updated">
              Uppfærsla tókst
            </div>
          </transition>

          <div class="form-group row">
            <label for="athlete.id" class="col-sm-2 col-form-label text-right">Númer:</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="athlete.id" v-model="athlete.id">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.fullName" class="col-sm-2 col-form-label text-right">Fullt nafn:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.fullName" v-model="athlete.fullName" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.ssnr" class="col-sm-2 col-form-label text-right">Kennitala:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.ssnr" v-model="athlete.ssnr" :disabled="working">
            </div>
            <div class="col-md-10 offset-md-2 py-2" v-if="!validSSNR()">
              <div class="alert alert-warning">
                Kennitala er ekki á réttu formi.
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.birthyear" class="col-sm-2 col-form-label text-right">Fæðingarár:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="athlete.birthyear" v-model="athlete.birthyear" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.country" class="col-sm-2 col-form-label text-right">Þjóðerni:</label>
            <div class="col-sm-10">
              <select class="form-control" id="athlete.country" v-model="athlete.country" :disabled="working">
                <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2 pt-0 text-right">Kyn:</legend>
            <div class="col-sm-10 text-left">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="athlete.gender" id="athlete.gender1" value="1" v-model="athlete.gender" :disabled="working">
                <label class="form-check-label" for="athlete.gender1">Karl</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="athlete.gender" id="athlete.gender2" value="2" v-model="athlete.gender" :disabled="working">
                <label class="form-check-label" for="athlete.gender2">Kona</label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="athlete.id" class="col-sm-2 col-form-label text-right">Fiffó númer:</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="athlete.id" v-model="athlete.thorId" :disabled="working">
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2 text-right">Félagasaga:</legend>
            <div class="col-sm-10 text-left">
              <div class="form-row py-1" v-for="(club,index) in athlete.clubs" :key="club.id">
                <div class="col-md-5">
                  <select class="form-control" id="" v-model="club.id" :disabled="working">
                    <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.fullname}}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" placeholder="Fra" v-model="club.from" :disabled="working">
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" placeholder="Til"  v-model="club.to" :disabled="working">
                </div>
                <div class="col-md-1">
                  <button class="btn btn-default" @click.prevent="removeClub(index)" :disabled="working">-</button>
                </div>
                <div class="col-md-12 py-2" v-if="!club.id && club.legacyTeam">
                  <div class="alert alert-warning">
                    <strong>Vinsamlegast lagið skráningu</strong>
                    <p>Þessi aðili var skráður í <em>{{ club.legacyTeam}}</em> í gamla grunninum sem er hugsanlega ekki rétt.</p>
                    <p>Athugið að iðkendur eiga vera skráðir íþrótta- eða ungmennafélög, ekki héraðssambönd, íþróttabandlög eða gervi-lið.</p>
                    <p>Sé liðið með réttu íþrótta- eða ungmennafélag þarf að stofna það sérstaklega. Vinsamlegast sendið beiðni á <a href="mailto:skraningarnefnd@fri.is">skraningarnefnd@fri.is</a></p>
                  </div>
                </div>
              </div>
              <div class="form-row py-1">
                <div class="col-md-1 offset-md-11">
                  <button class="btn btn-default" @click.prevent="addClub" :disabled="working">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-2 text-right">Yfirfarið:</div>
            <div class="col-sm-10 text-left">
              <div class="form-check" v-if="!athlete.confirmedByUser">
                <input type="checkbox" class="form-check-input" id="athlete.verified" v-model="athlete.verified">
                <label class="form-check-label" for="athlete.verified">Staðfesta að allir reitir og félagasaga sé rétt.</label>
              </div>
              <div v-if="athlete.confirmedByUser">
                <i class="fas fa-check-circle verified"></i> Upplýsingar um iðkanda hafa verið staðfestar.
              </div>
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
import { isValid } from 'kennitala-utility'

export default {
  name: 'idkandi',
  data () {
    return {
      working: false,
      athlete: {},
      countries: [],
      clubs: [],
      updated: null
    }
  },
  methods: {
    validSSNR () {
      return isValid(this.athlete.ssnr)
    },
    update () {
      this.working = true
      return agent
        .put(process.env.VUE_APP_API_HOST + '/athletes')
        .send(this.athlete)
        .then(res => {
          this.updated = !!res.body.id
          this.working = false
          setTimeout(() => {
            this.updated = false
          }, 2000)
        })
    },
    removeClub (index) {
      this.athlete.clubs.splice(index, 1)
    },
    addClub () {
      this.athlete.clubs.push({
        id: 0,
        to: '',
        from: ''
      })
    }
  },
  mounted () {
    agent
      .get(process.env.VUE_APP_API_HOST + '/athletes/' + this.$route.params.id)
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
      .get(process.env.VUE_APP_API_HOST + '/clubs/')
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
