<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-6 offset-md-3 card">
        <div class="card-body">
          <h3>
            {{ pass.fullname }}<h3>
              <img
                :src="qr"
                width="300"
                height="300"
              >
              <h4>
                {{ pass.id }}<h4>
                  <small>{{ pass.created | date }} - {{ pass.expires | date }}</small>
                </h4>
              </h4>
            </h3>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import agent from 'superagent'
import { format } from 'date-fns'

export default {
  name: 'Felag',
  filters: {
    date (str) {
      return format(str, 'DD.MM.YYYY')
    }
  },
  data () {
    return {
      pass: '',
      qr: process.env.FRI_API_URL + '/passes/' + this.$route.params.athleteId + '/qr'
    }
  },
  mounted () {
    agent
      .get(process.env.FRI_API_URL + '/passes/' + this.$route.params.athleteId)
      .then(res => {
        this.pass = res.body
      })
  }
}
</script>

<style>
h1 i {
  cursor: pointer;
  padding-right: 10px
}

h4 {
  margin-top: 1em;
  text-transform: uppercase;
}
</style>
