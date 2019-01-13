<template>
  <div>
    <ProvinceList msg="Íþróttahéruð"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProvinceList from '@/components/ProvinceList.vue'

export default {
  name: 'provinces',
  components: {
    ProvinceList
  }
}
</script>
