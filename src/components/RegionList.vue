<template>
  <div>
    <h1>Íþróttahéruð</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input
          id="firstName"
          type="text"
          class="form-control text-center"
          placeholder="Nafn héraðs"
          value
          @keyup="search"
        >
      </div>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th>Númer</th>
          <th>Skammstöfun</th>
          <th>Nafn</th>
        </tr>
        <tr
          v-for="region in filteredList"
          :key="region.id"
        >
          <td>{{ region.id }}</td>
          <td>{{ region.abbreviation }}</td>
          <td>{{ region.fullname }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'RegionList',
  props: {
    msg: String
  },
  data () {
    return {
      list: [],
      filteredList: []
    }
  },
  mounted () {
    agent
      .get(process.env.ICELANDATHLETICS_API + '/regions')
      .withCredentials()
      .then(res => {
        this.list = res.body
        this.filteredList = res.body
      })
  },
  methods: {
    search (e) {
      const searchString = e && e.target.value
      if (searchString) {
        this.filteredList = this.list.filter(item => {
          const foundFullname =
            item.fullname &&
            item.fullname.toLowerCase().includes(searchString.toLowerCase())

          const foundAbbreviation =
            item.abbreviation &&
            item.abbreviation.toLowerCase().includes(searchString.toLowerCase())
          return foundFullname || foundAbbreviation
        })
      } else {
        this.filteredList = this.list
      }
    }
  }
}
</script>

<style scoped>

</style>
