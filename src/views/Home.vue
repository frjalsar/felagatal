<template>
  <div>
    <ClubList msg="Félagalisti"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ClubList from '@/components/ClubList.vue'

export default {
  name: 'home',
  components: {
    ClubList
  }
}
</script>
