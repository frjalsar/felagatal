<template>
  <div class="form-group">
    <label :for="label">
      {{ label }}:
    </label>    
    <input
      :value="value"        
      :id="label"          
      :type="type || 'text'"
      :readonly="readonly"
      :class="readonly ? 'form-control-plaintext' : 'form-control'"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
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

<style scoped>
</style>