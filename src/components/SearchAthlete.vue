<template>
  <div class="hello">    
    <h1>{{ msg }}</h1>
    <input v-model="searchString" @keyup="search">
    <table>
      <tr>
        <th>ID</th>
        <th>Full NAME</th>
      </tr>
      <tr v-for="athlete in list" :key="athlete.id">
        <td>{{ athlete.id }}</td>
        <td>{{ athlete.fullName }}</td>
      </tr>
    </table>

   
  </div>
</template>

<script>
import agent from 'superagent'
export default {  
  name: 'SearchAthlete',
  props: {
    msg: String
  },
  data () {
    return {
      list: [],
      searchString: undefined
    }
  },
  methods: {
    search () {
       return agent
        .get('http://frjalsar.azurewebsites.net/athletes')
        .query({ search: this.searchString })
        .then(res => {
          this.list = res.body
        })
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
