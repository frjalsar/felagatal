<template>
  <form>
    <div class="row">
      <div class="col-md-6 offset-md-1 mb-md-3">
        <Input
          :value="venue.fullName"
          :label="'Fullt nafn'"
          :disabled="disabled"
          @input="venue.fullName = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Select
          :value="venue.indoor"
          :label="'Innanhús'"
          :options="options"
          :disabled="disabled"
          @change="venue.indoor = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Select
          :value="venue.banked"
          :label="'Hallandi'"
          :options="options"
          :disabled="disabled"
          @change="venue.banked = $event"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-1 mb-md-3">
        <Input
          :value="venue.straightLanes"
          :label="'Beinar brautir'"
          :disabled="disabled"
          @input="venue.straightLanes = $event"
        />
      </div>

      <div class="col-md-3 mb-md-3">
        <Input
          :value="venue.ovalLanes"
          :label="'Hringbrautir'"
          :disabled="disabled"
          @input="venue.ovalLanes = $event"
        />
      </div>

      <div class="col-sm-3 col-md-3 mb-md-3">
        <Input
          :value="venue.id"
          :label="'Númer'"
          :readonly="true"
          :disabled="disabled"
          @input="venue.id = $event"
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
          @click.prevent="$emit('save', venue)"
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
  name: 'Editvenue',
  components: {
    Alert,
    Input,
    Select,
    Button
  },
  props: {
    venue: {
      type: Object,
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
  },
  data () {
    return {
      options: [
        {
          value: true,
          text: 'Já'
        }, {
          value: false,
          text: 'Nei'
        }
      ]
    }
  }
}
</script>
