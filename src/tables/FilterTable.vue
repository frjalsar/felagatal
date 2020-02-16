<template>
  <div>
    <h1 class="text-center mb-4">
      {{ title }}
    </h1>
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
      <div class="col-md-12">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th
                v-for="header in headers"
                :key="header.field"
                :class="{
                  'd-none d-lg-table-cell': header.display === 'lg',
                  'd-none d-md-table-cell': header.display === 'md'
                }"
              >
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredData"
              :key="item.id"
              @click="onClick && onClick(item)"
            >
              <td
                v-for="header in headers"
                :key="header.field"
                :class="{
                  'd-none d-lg-table-cell': header.display === 'lg',
                  'd-none d-md-table-cell': header.display === 'md'
                }"
              >
                {{ item[header.field] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    definition: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      query: ''
    }
  },
  computed: {
    headers () {
      if (this.definition.length) {
        return this.definition
      }

      if (this.data.length) {
        return Object.keys(this.data[0]).map(key => {
          return {
            label: key,
            field: key
          }
        })
      }

      return []
    },
    filteredData () {
      return this.data.filter(item => {
        return this.definition.reduce((acc, def) => {
          const value = item[def.field]
          const valueType = typeof value

          if (valueType === 'string') {
            return acc || value.toUpperCase().includes(this.query.toUpperCase())
          }

          if (valueType === 'number') {
            return acc || Number(value).toString().includes(this.query)
          }

          return acc
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
