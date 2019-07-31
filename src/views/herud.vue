<template>
  <div>
    <RegionList msg="Íþróttahéruð" />
  </div>
</template>

<script>
// @ is an alias to /src
import RegionList from '../components/RegionList.vue'

export default {
  name: 'Regions',
  components: {
    RegionList
  }
}
</script>
