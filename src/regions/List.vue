<template>
  <div>
    <FilterTable
      title="Íþróttahéruð"
      placeholder="Sía"
      :definition="defintion"
      :data="data"
      :on-click="onClick"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import FilterTable from '../tables/FilterTable.vue'
import agent from 'superagent'

export default {
  name: 'RegionsList',
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
        display: 'md'
      }],
      onClick: (item) => {
        this.$router.push('/herud/' + item.id)
      }
    }
  },
  mounted () {
    agent
      .get(process.env.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.data = res.body.map(region => {
          return {
            id: region.id,
            abbreviation: region.abbreviation,
            fullName: region.fullName
          }
        })
      })
  }
}
</script>

<style scoped>
</style>
