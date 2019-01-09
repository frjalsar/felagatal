<template>
  <div>
    test
    <SearchAthlete msg="Keppendur"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchAthlete from '@/components/SearchAthlete.vue'

export default {
  name: 'about',
  components: {
    SearchAthlete
  }
}
</script>
