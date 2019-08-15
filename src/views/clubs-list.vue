<template>
  <div>
    <FilterTable
      title="Félög"
      placeholder="Leita"
      :definition="defintion"
      :data="data"
      :onClick="onClick"
    />
  </div>
</template>

<script>
import FilterTable from '../components/FilterTable.vue'
import agent from 'superagent'

export default {
  name: 'ClubsList',
  components: {
    FilterTable
  },
  data() {
    return {
      data: [],
      defintion: [{
        field: 'id',
        label: 'Númer'
      },{
        field: 'abbreviation',
        label: 'Skammstöfun'
      },{
        field: 'fullName',
        label: 'Nafn'      
      },{
        field: 'region',
        label: 'Íþróttahérað'     
      }],
      onClick: (item) => {
        this.$router.push('/felog/' + item.id)
      }
    }
  },
  mounted() {    
    agent
      .get(process.env.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.data = res.body.map(club => {
          return {
            id: club.id,
            abbreviation: club.abbreviation,
            fullName: club.fullName,
            region: club.region.abbreviation
          }
        })
      })    
    
  }
}
</script>

<style scoped>
  div {
    display: block;
  }
</style>
