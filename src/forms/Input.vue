<template>
  <div class="form-group row">
    <label :for="label" class="col-sm-3 col-form-label text-right">
      {{ label }}
    </label>

    <div class="col-sm-9">
      <input
        :value="value"        
        :id="label"          
        :type="type || 'text'"
        :readonly="readonly"
        :class="readonly ? 'form-control-plaintext' : 'form-control'"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      >
  </div>  
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: String,
    value: String | Number,
    label: String,
    readonly: Boolean,
    disabled: Boolean
  }
}
</script>