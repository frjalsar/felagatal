<template>
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
      :value="region.fullname"
      :label="'Fullt nafn'"
      :disabled="disabled"
      @input="region.fullName = $event"
    />
    
    <Input
      :value="region.abbreviation"
      :label="'Skammstöfun'"
      :disabled="disabled"
      @input="region.abbreviation = $event"
    />  

    <Button      
      :label="'Vista'"
      :disabled="disabled"
      @click="save"
    />

  </form>
</template>

<script>
import Alert from '../alert/Alert'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Radio from '../forms/Radio'
import Button from '../forms/Button'

export default {
  name: 'EditRegion',
  components: {
    Alert,
    Input,
    Select,
    Radio,
    Button
  },
  props: {
    region: Object,
    alert: Object,
    disabled: Boolean
  },
  methods: {
    save() {
      this.$emit('save', this.region)      
    },    
  }  
}
</script>
