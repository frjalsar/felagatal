<template>
  <div>
    <FilterTable
      title="Mannvirki"
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
  name: 'VenuesList',
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
        field: 'indoor',
        label: 'Innanhús'
      }, {
        field: 'banked',
        label: 'Hallandi'
      }, {
        field: 'straightLanes',
        label: 'Beinar brautir',
        display: 'lg'
      }, {
        field: 'ovalLanes',
        label: 'Hringbrautir',
        display: 'lg'
      }],
      onClick: (item) => {
        this.$router.push('/mannvirki/' + item.id)
      }
    }
  },
  created () {
    agent
      .get(process.env.FRI_API_URL + '/venues')
      .withCredentials()
      .then(res => {
        this.data = res.body
      })
  }
}
</script>

<style scoped>
  div {
    display: block;
  }
</style>
