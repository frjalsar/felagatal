<template>
<form>

  <div class="row">
    <div class="col-md-10 offset-md-1">
      <Alert :type="alert.type" :message="alert.msg" />
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 offset-md-1 mb-md-3">
      <Input
        :value="athlete.fullName"
        :label="'Fullt nafn'"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @input="athlete.fullName = $event"
      />
    </div>

    <div class="col-md-2 mb-md-3">
      <Input v-if="!readonly"
        :value="athlete.kt"
        :label="'Kennitala'"
        :disabled="disabled || readonly"
        @input="athlete.kt = $event"
      />
    </div>

    <div class="col-md-2 mb-md-3">
      <Input
        :value="athlete.birthyear"
        :label="'Fæðingarár'"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @input="athlete.birthyear = $event"
      />
    </div>    
  </div>

  <div class="row">
    <div class="col-md-2 offset-md-1 mb-md-3">    
      <Select
        :value="athlete.gender"      
        :label="'Kyn'"
        :options="genders"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @change="athlete.gender = $event"
      />
    </div>

    <div class="col-md-4 mb-md-3">
      <Select
        :value="athlete.country"      
        :label="'Land'"
        :options="countries"
        :readonly="readonly"
        :disabled="disabled || readonly"
        @change="athlete.country = $event"
      />
    </div>

    <div class="col-sm-6 col-md-2 mb-md-3">
      <Input
        :value="athlete.id"
        :label="'Númer'"
        :readonly="true"
        :disabled="disabled || readonly"
        @input="athlete.id = $event"
      />
    </div>

    <div class="col-sm-6 col-md-2  mb-md-3">
      <Input
        :value="athlete.thorId"
        :label="'Fiffó númer'"
        :readonly="true"
        :disabled="disabled || readonly"
        @input="athlete.thorId = $event"
      />    
    </div>
  </div>

  <Membership
      :label="'Félagasaga'"
      :membership="athlete.membership"
      :clubs="clubs"
      :readonly="readonly"
      :disabled="disabled || readonly"      
      @input="athlete.membership = $event"
    />

  <div class="row">
    <div class="col-md-12 text-center">    
      <Button
        v-if="!readonly"
        :label="'Vista'"
        :disabled="disabled"
        @click="$emit('save', athlete)"
      />
    </div>
  </div>

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
    disabled: Boolean,
    readonly: Boolean
  }  
}
</script>
