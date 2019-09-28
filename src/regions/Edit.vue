<template>
<form>
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <Alert :type="alert.type" :message="alert.msg" />
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 offset-md-1">
      <Input
        :value="region.fullName"
        :label="'Fullt nafn'"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @input="region.fullName = $event"
      />
    </div>
    
    <div class="col-md-2">
      <Input
        :value="region.abbreviation"
        :label="'Skammstöfun'"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @input="region.abbreviation = $event"
      />
    </div>

    <div class="col-md-2">
      <Input
        :value="region.id"
        :label="'Númer'"
        :readonly="true"
        :disabled="disabled"
        @input="club.id = $event"
      />
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 text-center">
      <Button
        v-if="!readonly"
        :label="'Vista'"
        :disabled="disabled"
        @click="$emit('save', region) "
      />
    </div>
  </div>
</form>
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
