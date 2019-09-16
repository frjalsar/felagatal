<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <a          
          class="btn btn-sm"
          v-for="letter in alphabet"
          :key="letter"
          :class="{'btn-outline-secondary': startsWith === letter}"
          @click="toggleLetter(letter)"
        >
          {{ letter }}
        </a>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <input
          :value="search"
          type="text"
          class="form-control text-center"
          placeholder="Leita"
          @keyup="searchInput"
        >
      </div>
      <div class="col-md-3">
        <select
          :value="regionId"
          class="form-control"
          @change="changeRegion"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Íþróttahérað
          </option>
          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
          {{ region.fullName }} 
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select
          :value="clubId"
          class="form-control"
          @change="changeClub"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Félag
          </option>
          <option
            v-for="club in filteredClubs"
            :key="club.id"
            :value="club.id"
          >
          {{ club.fullName }} 
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <select
          :value="legacyClub"
          class="form-control"
          @change="changeLegacy"
        > 
          <option
            selected="selected"
            :value="undefined"
          >
            Gömul skráning
          </option>
          <option
            v-for="club in legacy"
            :key="club"
            :value="club"
          >
          {{ club }} 
          </option>
        </select>
      </div>
      <div class="col-md-1">
        <button
          type="button"
          class="btn btn-secondary"
          @click="clear"
        >
        Hreinsa
        </button>
      </div>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'AthleteSearchPanel',
  props: {
    regions: Array,
    clubs: Array,
    legacy: Array,
    default: Object
  },
  data() {
    console.log(this.settings)
    return {
      startsWith: this.default.startsWith,
      search: this.default.search,
      regionId: this.default.regionId,
      clubId:  this.default.clubId,
      legacyClub: this.default.legacyClub,
      alphabet: ['A', 'Á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z', 'Þ', 'Æ', 'Ö'],
    }
  },
  computed: {
    selected() {
      return {
        startsWith: this.startsWith,
        search: this.search,
        regionId: this.regionId,
        clubId: this.clubId,
        legacyClub: this.legacyClub
      }
    },
    filteredClubs() {
      if (this.regionId > 0) {
        return this.clubs.filter(club => club.regionId === Number(this.regionId))
      } else {
        return this.clubs
      }
    },
  },
  methods: {
    clear() {
      this.startsWith = undefined
      this.search = undefined
      this.regionId = undefined
      this.clubId = undefined
      this.legacyClub = undefined
      this.$emit('change', this.selected)
    },
    toggleLetter(letter) {
      if (this.startsWith === letter) {
        this.startsWith = undefined
      } else {
        this.startsWith = letter
      }
      this.$emit('change', this.selected)
    },
    searchInput: debounce(function(e) {
      this.startsWith = undefined
      this.search = e.target && e.target.value
      if (this.search.length >= 3) {
        this.$emit('change', this.selected)
      }
    },300),
    changeRegion(e) {
      this.regionId = e.target.value
      this.clubId = undefined
      this.$emit('change', this.selected)
    },
    changeClub(e) {
      this.clubId = e.target.value
      this.$emit('change', this.selected)
    },
    changeLegacy(e) {      
      this.legacyClub = e.target.value
      this.regionId = undefined
      this.clubId = undefined
      this.$emit('change', this.selected)
    }
  }  
}
</script>