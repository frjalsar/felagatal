<template>
  <div class="form-group row">
    <legend class="col-form-label col-sm-3 pt-0 text-right">
      {{ label }}
    </legend>

    <div class="col-sm-9 text-left">
      <div
        v-for="opt in options"
        :key="opt.value"
        class="form-check form-check-inline"
      >
        <input
          :id="opt.value"
          :value="opt.value"
          :disabled="disabled"
          :checked="opt.value === value"
          class="form-check-input"
          type="checkbox"
          @change="$emit('change', $event.target.checked)"
        >
        <label
          class="form-check-label"
          :for="opt.value"
        >
          {{ opt.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
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
    }
  }
}
</script>
