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
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
