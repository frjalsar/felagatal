<template>
  <div class="form-group">
    <label :for="label">
      {{ label }}:
    </label>

    <select
      :id="label"
      :readonly="readonly"
      :class="readonly ? 'form-control-plaintext' : 'form-control'"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
    >
      <option :value="null">
        --- Veldu
      </option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :selected="opt.value === value"
      >
        {{ opt.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
