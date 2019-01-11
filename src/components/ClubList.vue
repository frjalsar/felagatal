<template>
  <div>
    <h1>Félög</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input
          type="text"
          class="form-control text-center"
          id="firstName"
          placeholder="Nafn félags"
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
          <tr v-for="club in filteredList" :key="club.id">
            <td>{{ club.id }}</td>
            <td>{{ club.shortname }}</td>
            <td>{{ club.fullname }}</td>
          </tr>
        </table>

    </div>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'ClubList',
  props: {
    msg: String
  },
  data () {
    return {
      list: [],
      filteredList: []
    }
  },
  methods: {
    search (e) {
      const searchString = e && e.target.value
      if (searchString) {
        this.filteredList = this.list.filter(item => {
          const foundFullname =
            item.fullname &&
            item.fullname.toLowerCase().includes(searchString.toLowerCase())
          return foundFullname
        })
      } else {
        this.filteredList = this.list
      }
    }
  },
  mounted () {
    agent
      .get(process.env.VUE_APP_API_HOST + '/clubs')
      .then(res => {
        this.list = res.body
        this.filteredList = res.body
      })
  }
}
</script>

<style scoped>

</style>
