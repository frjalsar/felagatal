<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input
          v-model="query"
          type="text"
          class="form-control text-center"
          :placeholder="placeholder"
        >
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th v-for="header in headers" :key="header.field">{{ header.label }}</th>
        </tr>
        <tr
          v-for="item in filteredData"
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
export default {
  name: 'FilterTable',
  props: {
    title: String,
    placeholder: String,
    definition: Array,
    data: Array,    
    onClick: Function
  },
  data() {
    return {
      query: ''
    }
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
    },
    filteredData() {
      return this.data.filter(item => {
        return this.definition.reduce((acc, def) => {
          const value = item[def.field]          
          const valueType = typeof value

          if (value) {
            if (valueType === 'string') {              
              return acc || value.toUpperCase().includes(this.query.toUpperCase())
            }

            if (valueType === 'number') {
              return acc || Number(value).toString().includes(this.query)
            }
          }

          return false
        }, false)
      })
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
