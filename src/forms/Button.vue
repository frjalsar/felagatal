<template>
  <button
    type="submit"
    class="btn btn-secondary mt-4"
    :disabled="disabled"
    @click.prevent="click"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
    disabled: Boolean
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
