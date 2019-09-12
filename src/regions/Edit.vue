<template>
<div class="col-md-10 offset-md-1 card">
  <form class="card-body">
    <Alert :type="alert.type" :message="alert.msg" />

    <Input
      :value="region.id"
      :label="'Númer'"
      :readonly="true"
      :disabled="disabled"
      @input="club.id = $event"
    />

    <Input
      :value="region.fullName"
      :label="'Fullt nafn'"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @input="region.fullName = $event"
    />
    
    <Input
      :value="region.abbreviation"
      :label="'Skammstöfun'"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @input="region.abbreviation = $event"
    />  
    
    <!--Checkbox
      v-if="!readonly"
      :value="region.verified"
      :label="'Staðfesting'"
      :options="[{
        value: true,
        text: 'Staðfesta að gögn sé rétt skráð'
      }]"
      :disabled="disabled"
      @change="region.verified= $event"
    /-->

    <Button      
      v-if="!readonly"
      :label="'Vista'"
      :disabled="disabled"
      @click="$emit('save', region) "
    />

  </form>
</div>
</template>

<script>
import Alert from '../alert/Alert'
import Input from '../forms/Input'
import Checkbox from '../forms/Checkbox'
import Button from '../forms/Button'

export default {
  name: 'EditRegion',
  components: {
    Alert,
    Input,
    Checkbox,
    Button
  },
  props: {
    region: Object,
    alert: Object,
    disabled: Boolean,
    readonly: Boolean
  }
}
</script>
