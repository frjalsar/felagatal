<template>
  <form class="card-body">
    <Alert :type="alert.type" :message="alert.msg" />

    <Input
      :value="athlete.id"
      :label="'Númer'"
      :readonly="true"
      :disabled="disabled"
      @input="athlete.id = $event"
    />

    <Input
      :value="athlete.fullName"
      :label="'Fullt nafn'"
      :disabled="disabled"
      @input="athlete.fullName = $event"
    />

    <Input
      :value="athlete.ssnr"
      :label="'Kennitala'" 
      :disabled="disabled"
      @input="athlete.ssnr = $event"
    />

    <Input
      :value="athlete.birthyear"
      :label="'Fæðingarár'"
      :disabled="disabled"
      @input="athlete.birthyear = $event"
    />

    <Select
      :value="athlete.country"      
      :label="'Land'"
      :options="countries"
      :disabled="disabled"
      @input="athlete.country = $event"
    />

    <Radio
      :value="athlete.gender"      
      :label="'Kyn'"
      :options="genders"
      :disabled="disabled"
      @change="athlete.gender = $event"
    />

    <Input
      :value="athlete.thorId"
      :label="'Fiffó kóði'"
      :readonly="true"
      :disabled="disabled"      
      @input="athlete.thorId = $event"
    />    

    <Membership
      :label="'Félagasaga'"
      :membership="athlete.membership"
      :clubs="clubs"
      :disabled="disabled"
      @input="athlete.membership = $event"
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
import Membership from './Membership'

export default {
  name: 'EditAthlete',
  components: {
    Alert,
    Input,
    Select,
    Radio,
    Button,
    Membership
  },
  props: {
    athlete: Object,
    clubs: Array,
    countries: Array,
    genders: Array,
    alert: Object,
    disabled: Boolean
  },
  methods: {
    save() {
      this.$emit('save', this.athlete)      
    },    
  }  
}
</script>
