<template>
  <div>
    <SearchTable
      title="Iðkendur"
      placeholder="Leita"
      :definition="defintion"
      :searchFn="searchFn"
      :onClick="onClick"
    />
  </div>
</template>

<script>
import SearchTable from '../tables/SearchTable.vue'
import agent from 'superagent'

export default {
  name: 'AthletesList',
  components: {
    SearchTable
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
        field: 'clubName',
        label: 'Félag'
      },{
        field: 'country',
        label: 'Land'
      }],
      onClick: (item) => {
        this.$router.push('/idkendur/' + item.id)
      },
      searchFn: (query) => {
        return agent
          .get(process.env.FRI_API_URL + '/athletes')
          .withCredentials()
          .query({ search: query })
          .then(res => {
            return res.body.map(athlete => {
              return  {
                id: athlete.id,
                fullName: athlete.fullName,
                birthyear: athlete.birthyear,
                clubName: athlete.membership.length && athlete.membership[athlete.membership.length - 1].fullName,
                country: athlete.country
              }              
            })
          })
      }
    }
  }  
}
</script>

<style scoped>
</style>
