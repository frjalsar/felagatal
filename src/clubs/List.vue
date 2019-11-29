<template>
  <div>
    <FilterTable
      title="Félög"
      placeholder="Sía"
      :definition="defintion"
      :data="data"
      :on-click="onClick"
    />
  </div>
</template>

<script>
import FilterTable from '../tables/FilterTable.vue'
import agent from 'superagent'

export default {
  name: 'ClubsList',
  components: {
    FilterTable
  },
  data () {
    return {
      data: [],
      defintion: [{
        field: 'id',
        label: 'Númer',
        display: 'lg'
      }, {
        field: 'fullName',
        label: 'Nafn'
      }, {
        field: 'abbreviation',
        label: 'Skammstöfun',
        display: 'lg'
      }, {
        field: 'region',
        label: 'Íþróttahérað',
        display: 'md'
      }],
      onClick: (item) => {
        this.$router.push('/felog/' + item.id)
      }
    }
  },
  mounted () {
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
