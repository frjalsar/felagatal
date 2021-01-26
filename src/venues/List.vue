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
        field: 'indoorText',
        label: 'Innanhús'
      }, {
        field: 'bankedText',
        label: 'Hallandi braut',
        display: 'lg'
      }, {
        field: 'straightLanes',
        label: 'Fjöldi beinna brauta',
        display: 'lg'
      }, {
        field: 'ovalLanes',
        label: 'Fjöldi hringbrauta',
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
        this.data = res.body.map(item => {
          item.bankedText = item.banked ? 'Já' : 'Nei'
          item.indoorText = item.indoor ? 'Já' : 'Nei'
          return item
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
