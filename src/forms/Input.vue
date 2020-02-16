<template>
  <div class="form-group">
    <label :for="label">
      {{ label }}:
    </label>
    <input
      :id="label"
      :value="value"
      :type="type"
      :readonly="readonly"
      :class="className"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className () {
      return this.readonly ? 'form-control-plaintext' : 'form-control'
    }
  }
}
</script>

<style scoped>
</style>
