<template>
<div class="col-md-10 offset-md-1 card">
  <form class="card-body">
    <Alert :type="alert.type" :message="alert.msg" />

    <Input
      :value="club.id"
      :label="'Númer'"
      :readonly="true"
      :disabled="disabled"
      @input="club.id = $event"
    />

    <Input
      :value="club.fullName"
      :label="'Fullt nafn'"
      :disabled="disabled"
      @input="club.fullName = $event"
    />

    <Input
      :value="club.shortName"
      :label="'Stutt nafn'" 
      :disabled="disabled"
      @input="club.shortName = $event"
    />

    <Input
      :value="club.abbreviation"
      :label="'Skammstöfun'"
      :disabled="disabled"
      @input="club.abbreviation = $event"
    />

    <Select
      :value="club.regionId"      
      :label="'Íþróttahérað'"
      :options="regions"
      :disabled="disabled"
      @input="club.regionId = $event"
    />

    <Input
      :value="club.thorId"
      :label="'Fiffó kóði'"
      :readonly="true"
      :disabled="disabled"      
      @input="club.thorId = $event"
    />

    <Button      
      :label="'Vista'"
      :disabled="disabled"
      @click="save"
    />

  </form>
</div>
</template>

<script>
import Alert from '../alert/Alert'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Radio from '../forms/Radio'
import Button from '../forms/Button'

export default {
  name: 'EditClub',
  components: {
    Alert,
    Input,
    Select,
    Radio,
    Button
  },
  props: {
    club: Object,
    regions: Array,
    alert: Object,
    disabled: Boolean
  },
  methods: {
    save() {
      this.$emit('save', this.club)      
    },    
  }  
}
</script>
