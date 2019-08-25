<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input                    
          type="text"
          class="form-control text-center"
          :placeholder="placeholder"
          @keyup="search"
        >
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th v-for="header in headers" :key="header.field">{{ header.label }}</th>
        </tr>
        <tr
          v-for="item in results"
          :key="item.id"
          @click="onClick && onClick(item)"
        >
          <td v-for="header in headers" :key="header.field">{{ item[header.field] }}</td>
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
    placeholder: String,
    definition: Array,
    searchFn: Function,
    onClick: Function
  },
  data() {
    return {
      results: []
    }
  },
  methods: {
    search: debounce(function(e) {
      if (e.target && e.target.value.length > 3) {
        this.searchFn(e.target.value).then(res => {
          this.results = res
        })
      }
    },500)
  },
  computed: {
    headers() {
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
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>
