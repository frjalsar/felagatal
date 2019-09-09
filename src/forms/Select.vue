<template>
  <div class="form-group row">
    <label :for="label" class="col-sm-3 col-form-label text-right">
      {{ label }}
    </label>

    <div class="col-sm-9">
      <select        
        :id="label" 
        :readonly="readonly"        
        :class="readonly ? 'form-control-plaintext' : 'form-control'"
        :disabled="disabled"
        @change="$emit('change', $event.target.value)"
      > 
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
    type: String,
    value: String | Number,
    label: String,
    readonly: Boolean,
    disabled: Boolean,
    options: Array
  }
}
</script>