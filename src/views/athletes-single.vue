<template>
  <div>
    <FilterTable
      title="Félög"
      placeholder="Leita"
      :definition="defintion"
      :data="data"
      :action="action"
    />
  </div>
</template>

<script>
import FilterTable from '../components/FilterTable.vue'
import agent from 'superagent'

export default {
  name: 'Home',
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
        field: 'fullName',
        label: 'Nafn'      
      },{
        field: 'birthyear',
        label: 'Fæðingarár'
      },{
        field: 'birthyear',
        label: 'Félag'
      }],
      action: (item) => {
        this.$router.push({
          name: 'felog',
          params: { id: item.id }
        })
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
</style>
