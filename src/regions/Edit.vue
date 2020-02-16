<template>
  <form>
    <div class="row">
      <div class="col-md-6 offset-md-1 mb-md-3">
        <Input
          :value="region.fullName"
          :label="'Fullt nafn'"
          :disabled="disabled"
          @input="region.fullName = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Input
          :value="region.abbreviation"
          :label="'Skammstöfun'"
          :disabled="disabled"
          @input="region.abbreviation = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
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
          @click.prevent="$emit('save', region) "
        />
      </div>
    </div>
  </form>
</template>

<script>
import Alert from '../alert/Alert'
import Input from '../forms/Input'
import Button from '../forms/Button'

export default {
  name: 'EditRegion',
  components: {
    Alert,
    Input,
    Button
  },
  props: {
    region: {
      type: Object,
      required: true
    },
    alert: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
