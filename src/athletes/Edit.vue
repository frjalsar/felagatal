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
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <legend class="col-form-label">Félagasaga:</legend>
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 offset-md-1">
      <Timeline :start="startYear" :end="endYear" :data="athlete.membership" alignYear="left" />
    </div>

    <div class="col-md-8">
      <MembershipAdmin :current="athlete.membership" :pending="athlete.pendingMembership" />
    </div>

    <div class="col-md-1">
      <Timeline :start="startYear" :end="endYear" :data="athlete.pendingMembership" alignYear="right" background="#6c757d" />
    </div>
  </div>
  
  <div class="row">
    <div class="col-md-12 text-center">    
      <Button
        class="btn btn-secondary"
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
import Timeline from './Timeline'
import MembershipAdmin from './MembershipAdmin'

export default {
  name: 'EditAthlete',
  components: {
    Alert,
    Input,
    Select,
    Radio,
    Button,
    Timeline,
    MembershipAdmin
  },
  props: {
    athlete: Object,
    clubs: Array,
    countries: Array,
    genders: Array,
    alert: Object,
    disabled: Boolean,
    readonly: Boolean
  }, 
  computed: {
    startYear() {
      if (this.athlete.membership) {
        const current = this.athlete.membership
          .map(m => new Date(m.from))
          .sort((a,b) => a -b)

        const pending = this.athlete.pendingMembership
          .map(m => new Date(m.from))
          .sort((a,b) => a -b)
        
        const min = Math.min(current[0], pending[0]) || current[0]
        return new Date(min).getFullYear()      
      }
    },
    endYear() {
      if (!!this.athlete.membership) {
        const current = this.athlete.membership
          .map(m => m.to ? new Date(m.to) : new Date())
          .sort((a,b) => b - a)

        const pending = this.athlete.pendingMembership
          .map(m => m.to ? new Date(m.to) : new Date())
          .sort((a,b) => b -a)
        
        const max = Math.min(current[0], pending[0]) || current[0]
        return new Date(max).getFullYear()
      }
    }
  },
  methods: {
    newMembership() {
      console.log('create new membership')
    }      
  }
}
</script>
