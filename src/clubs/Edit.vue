<template>
  <form>
    <div class="row">
      <div class="col-md-5 offset-md-1 mb-md-3">
        <Input
          :value="club.fullName"
          :label="'Fullt nafn'"
          :disabled="disabled"
          @input="club.fullName = $event"
        />
      </div>

      <div class="col-md-3 mb-md-3">
        <Input
          :value="club.shortName"
          :label="'Stutt nafn'"
          :disabled="disabled"
          @input="club.shortName = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Input
          :value="club.abbreviation"
          :label="'Skammstöfun'"
          :disabled="disabled"
          @input="club.abbreviation = $event"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 offset-md-1 mb-md-3">
        <Select
          :value="club.regionId"
          :label="'Íþróttahérað'"
          :options="regions"
          :disabled="disabled"
          @change="club.regionId = $event"
        />
      </div>

      <div class="col-sm-6 col-md-3 mb-md-3">
        <Input
          :value="club.id"
          :label="'Númer'"
          :readonly="true"
          :disabled="disabled"
          @input="club.id = $event"
        />
      </div>

      <div class="col-sm-6 col-md-2 mb-md-3">
        <Input
          :value="club.thorId"
          :label="'Þór númer'"
          :readonly="true"
          :disabled="disabled"
          @input="club.thorId = $event"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-10 offset-md-1">
        <Alert
          :type="alert.type"
          :message="alert.msg"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-center">
        <Button
          v-if="!disabled"
          :label="'Vista'"
          :disabled="disabled"
          @click.prevent="$emit('save', club)"
        />
      </div>
    </div>
  </form>
</template>

<script>
import Alert from '../alert/Alert'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Button from '../forms/Button'

export default {
  name: 'EditClub',
  components: {
    Alert,
    Input,
    Select,
    Button
  },
  props: {
    club: {
      type: Object,
      required: true
    },
    regions: {
      type: Array,
      required: true
    },
    alert: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      value: true
    }
  }
}
</script>
