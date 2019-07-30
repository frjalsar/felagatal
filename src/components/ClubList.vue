<template>
  <div>
    <h1>Félög</h1>
    <div class="row mb-4">
      <div class="col-md-4 offset-md-4">
        <input
          id="firstName"
          type="text"
          class="form-control text-center"
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
          <th>Íþróttahérað</th>
        </tr>
        <tr
          v-for="club in filteredList"
          :key="club.id"
          @click="goToClub(club.id)"
        >
          <td>{{ club.id }}</td>
          <td>{{ club.abbreviation }}</td>
          <td>{{ club.fullName }}</td>
          <td>{{ club.province && club.province.abbreviation }}</td>
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
  mounted () {
    agent
      .get(process.env.VUE_APP_API_HOST + '/clubs')
      .then(res => {
        this.list = res.body
        this.filteredList = res.body
      })
  },
  methods: {
    goToClub (clubId) {
      this.$router.push({
        name: 'felog',
        params: { id: clubId }
      })
    },
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
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>
