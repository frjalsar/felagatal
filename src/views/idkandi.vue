<template>
  <div>
    <h1>
      <i
        class="fas fa-arrow-left"
        @click="$router.go(-1)"
      /> Iðkandi
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

          <div class="form-group row">
            <label
              for="athlete.id"
              class="col-sm-3 col-form-label text-right"
            >Númer:</label>
            <div class="col-sm-9">
              <input
                id="athlete.id"
                v-model="athlete.id"
                type="text"
                readonly
                class="form-control-plaintext"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="athlete.fullName"
              class="col-sm-3 col-form-label text-right"
            >Fullt nafn:</label>
            <div class="col-sm-9">
              <input
                id="athlete.fullName"
                v-model="athlete.fullName"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
          </div>
          <!--div class="form-group row">
            <label
              for="athlete.ssnr"
              class="col-sm-3 col-form-label text-right"
            >Kennitala:</label>
            <div class="col-sm-9">
              <input
                id="athlete.ssnr"
                v-model="athlete.ssnr"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
            <div
              v-if="!validSSNR()"
              class="col-md-10 offset-md-2 py-2"
            >
              <div class="alert alert-warning">
                Kennitala er ekki á réttu formi.
              </div>
            </div>
          </div-->
          <div class="form-group row">
            <label
              for="athlete.birthyear"
              class="col-sm-3 col-form-label text-right"
            >Fæðingarár:</label>
            <div class="col-sm-9">
              <input
                id="athlete.birthyear"
                v-model="athlete.birthyear"
                type="text"
                class="form-control"
                :disabled="working"
              >
            </div>
          </div>
          <div class="form-group row">
            <label
              for="athlete.country"
              class="col-sm-3 col-form-label text-right"
            >Þjóðerni:</label>
            <div class="col-sm-9">
              <select
                id="athlete.country"
                v-model="athlete.country"
                class="form-control"
                :disabled="working"
              >
                <option
                  v-for="country in countries"
                  :key="country.code"
                  :value="country.code"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-3 pt-0 text-right">
              Kyn:
            </legend>
            <div class="col-sm-9 text-left">
              <div class="form-check form-check-inline">
                <input
                  id="athlete.gender1"
                  v-model="athlete.gender"
                  class="form-check-input"
                  type="radio"
                  name="athlete.gender"
                  value="1"
                  :disabled="working"
                >
                <label
                  class="form-check-label"
                  for="athlete.gender1"
                >Karl</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  id="athlete.gender2"
                  v-model="athlete.gender"
                  class="form-check-input"
                  type="radio"
                  name="athlete.gender"
                  value="2"
                  :disabled="working"
                >
                <label
                  class="form-check-label"
                  for="athlete.gender2"
                >Kona</label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label
              for="athlete.id"
              class="col-sm-3 col-form-label text-right"
            >Fiffó númer:</label>
            <div class="col-sm-9">
              <input
                id="athlete.id"
                v-model="athlete.thorId"
                type="text"
                readonly
                class="form-control-plaintext"
                :disabled="working"
              >
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-3 text-right">
              Félagasaga:
            </legend>
            <div class="col-sm-9 text-left">
              <div
                v-for="(club,index) in athlete.clubs"
                :key="club.id"
                class="form-row py-1"
              >
                <div class="col-md-5">
                  <select
                    id=""
                    v-model="club.id"
                    class="form-control"
                    :disabled="working"
                  >
                    <option
                      v-for="club in clubs"
                      :key="club.id"
                      :value="club.id"
                    >
                      {{ club.fullName }}
                    </option>
                  </select>
                </div>
                <div class="col-md-3">
                  <input
                    v-model="club.from"
                    type="text"
                    class="form-control"
                    placeholder="Fra"
                    :disabled="working"
                  >
                </div>
                <div class="col-md-3">
                  <input
                    v-model="club.to"
                    type="text"
                    class="form-control"
                    placeholder="Til"
                    :disabled="working"
                  >
                </div>
                <div class="col-md-1">
                  <button
                    class="btn btn-default"
                    :disabled="working"
                    @click.prevent="removeClub(index)"
                  >
                    -
                  </button>
                </div>
                <div
                  v-if="!club.id && club.legacyTeam"
                  class="col-md-12 py-2"
                >
                  <div class="alert alert-warning">
                    <strong>Vinsamlegast lagið skráningu</strong>
                    <p>Þessi aðili var skráður í <em>{{ club.legacyTeam }}</em> í gamla grunninum sem er hugsanlega ekki rétt.</p>
                    <p>Athugið að iðkendur eiga vera skráðir íþrótta- eða ungmennafélög, ekki héraðssambönd, íþróttabandlög eða gervi-lið.</p>
                    <p>Sé liðið með réttu íþrótta- eða ungmennafélag þarf að stofna það sérstaklega. Vinsamlegast sendið beiðni á <a href="mailto:skraningarnefnd@fri.is">skraningarnefnd@fri.is</a></p>
                  </div>
                </div>
              </div>
              <div class="form-row py-1">
                <div class="col-md-1 offset-md-11">
                  <button
                    class="btn btn-default"
                    :disabled="working"
                    @click.prevent="addClub"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-3 text-right">
              Yfirfarið:
            </div>
            <div class="col-sm-9 text-left">
              <div
                v-if="!athlete.confirmedByUser"
                class="form-check"
              >
                <input
                  id="athlete.verified"
                  v-model="athlete.verified"
                  type="checkbox"
                  class="form-check-input"
                >
                <label
                  class="form-check-label"
                  for="athlete.verified"
                >Staðfesta að allir reitir og félagasaga sé rétt.</label>
              </div>
              <div v-if="athlete.confirmedByUser">
                <i class="fas fa-check-circle verified" /> Upplýsingar um iðkanda hafa verið staðfestar.
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-secondary mt-4"
            :disabled="working"
            @click.prevent="update"
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
import { isValid } from 'kennitala-utility'

export default {
  name: 'Idkandi',
  data () {
    return {
      working: false,
      athlete: {},
      countries: [],
      clubs: [],
      updated: null
    }
  },
  mounted () {
    agent
      .get(process.env.ICELANDATHLETICS_API + '/athletes/' + this.$route.params.id)
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
      .get(process.env.ICELANDATHLETICS_API + '/clubs/')
      .then(res => {
        this.clubs = res.body
      })
  },
  methods: {
    validSSNR () {
      return isValid(this.athlete.ssnr)
    },
    update () {
      this.working = true
      return agent
        .put(process.env.ICELANDATHLETICS_API + '/athletes')
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
