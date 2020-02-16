<template>
  <transition name="fade">
    <div
      v-if="message && type"
      class="alert text-center"
      :class=" {
        'alert-success': type === 'success',
        'alert-warning': type === 'warning',
        'alert-danger': type === 'danger'
      }"
      role="alert"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
