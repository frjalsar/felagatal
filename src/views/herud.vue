<template>
  <div>
    <ProvinceList msg="Íþróttahéruð" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProvinceList from '../components/ProvinceList.vue'

export default {
  name: 'Provinces',
  components: {
    ProvinceList
  }
}
</script>
