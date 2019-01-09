<template>
  <div class="hello">     
    <h1>{{ msg }}</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Full NAME</th>
      </tr>
      <tr v-for="club in list" :key="club.id">
        <td>{{ club.id }}</td>
        <td>{{ club.fullname }}</td>
      </tr>
    </table>

   
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
      list: []
    }
  },
  mounted () {
    agent
      .get('http://frjalsar.azurewebsites.net/clubs')
      .then(res => {
        this.list = res.body
      })
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
