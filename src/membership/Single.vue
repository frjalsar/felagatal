<template>
  <div class="panel">
    test
  </div>
</template>
<script>
import agent from 'superagent'
export default {
  name: 'MembershipSingle',
  data () {
    return {
      athlete: undefined
    }
  },
  mounted () {
    agent
      .get(process.env.FRI_API_URL + '/athletes/' + this.$route.params.id)
      .withCredentials()
      .then(res => {
        this.athlete = res.body
      })
  }
}
</script>
