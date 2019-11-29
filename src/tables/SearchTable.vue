<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="row mb-4">
      <div class="col-md-12">
        <a
          v-for="letter in alphabet"
          :key="letter"
          class="btn btn-sm"
          @click="search(letter)"
        >
          {{ letter }}
        </a>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-4">
        <input
          type="text"
          class="form-control text-center"
          :placeholder="placeholder"
          @keyup="inputSearch"
        >
      </div>
      <div class="col-md-4">
        <select
          class="form-control"
        >
          <option>
            Íþróttahérað
          </option>
          <option
            v-for="(region) in regions"
            :key="region.id"
          >
            {{ region.fullName }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <select
          class="form-control"
        >
          <option>
            Félag
          </option>
          <option
            v-for="club in clubs"
            :key="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th
            v-for="header in headers"
            :key="header.field"
          >
            {{ header.label }}
          </th>
        </tr>
        <tr
          v-for="item in results"
          :key="item.id"
          @click="onClick && onClick(item)"
        >
          <td
            v-for="header in headers"
            :key="header.field"
          >
            {{ item[header.field] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'SearchTable',
  props: {
    title: String,
    data: Array,
    clubs: Array,
    regions: Array,
    placeholder: String,
    definition: Array,
    searchFn: Function,
    onClick: Function
  },
  data () {
    return {
      results: this.data,
      alphabet: ['A', 'Á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z', 'Þ', 'Æ', 'Ö']
    }
  },
  methods: {
    search (val) {
      this.searchFn(val).then(res => {
        this.results = res
      })
    },
    inputSearch: debounce(function (e) {
      if (e.target && e.target.value.length >= 3) {
        this.search(e.target.value)
      }
    }, 300)
  },
  computed: {
    headers () {
      if (this.definition && this.definition.length > 0) {
        return this.definition
      }
      if (this.data && this.data.length > 0) {
        return Object.keys(this.data[0]).map(key => {
          return {
            label: key,
            field: key
          }
        })
      }
    }
  },
  watch: {
    data (val) {
      this.results = val
    }
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>
