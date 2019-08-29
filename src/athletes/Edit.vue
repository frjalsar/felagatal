<template>
<div class="col-md-10 offset-md-1 card">
  <form class="card-body">
    <Alert :type="alert.type" :message="alert.msg" />

    <Input
      :value="athlete.id"
      :label="'Númer'"
      :readonly="true"
      :disabled="disabled || readonly"
      @input="athlete.id = $event"
    />

    <Input
      :value="athlete.fullName"
      :label="'Fullt nafn'"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @input="athlete.fullName = $event"
    />

    <Input v-if="!readonly"
      :value="athlete.ssnr"
      :label="'Kennitala'"
      :disabled="disabled || readonly"
      @input="athlete.ssnr = $event"
    />

    <Input
      :value="athlete.birthyear"
      :label="'Fæðingarár'"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @input="athlete.birthyear = $event"
    />

    <Select
      :value="athlete.country"      
      :label="'Land'"
      :options="countries"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @input="athlete.country = $event"
    />

    <Radio
      :value="athlete.gender"      
      :label="'Kyn'"
      :options="genders"
      :readonly="readonly"
      :disabled="disabled || readonly"
      @change="athlete.gender = $event"
    />

    <Input
      :value="athlete.thorId"
      :label="'Fiffó kóði'"
      :readonly="true"
      :disabled="disabled || readonly"
      @input="athlete.thorId = $event"
    />    

    <Membership
      :label="'Félagasaga'"
      :membership="athlete.membership"
      :clubs="clubs"
      :readonly="readonly"
      :disabled="disabled || readonly"      
      @input="athlete.membership = $event"
    />

    <Button
      v-if="!readonly"
      :label="'Vista'"
      :disabled="disabled"
      @click="$emit('save', athlete)"
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
    disabled: Boolean,
    readonly: Boolean
  }  
}
</script>
