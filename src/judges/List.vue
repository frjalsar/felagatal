<template>
  <div>
    <FilterTable
      title="Dómarar"
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
        field: 'clubFullName',
        label: 'Félag'
      }, {
        field: 'date',
        label: 'Dagsetning'
      }],
      onClick: (item) => {
        this.$router.push('/domarar/' + item.id)
      }
    }
  },
  created () {
    agent
      .get(process.env.FRI_API_URL + '/judges')
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
