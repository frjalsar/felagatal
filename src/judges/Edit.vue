<template>
  <form>
    <div class="row">
      <div class="col-md-6 offset-md-1 mb-md-3">
        <Input
          :value="judge.fullName"
          :label="'Fullt nafn'"
          :disabled="disabled"
          @input="judge.fullName = $event"
        />
      </div>

      <div class="col-md-4 mb-md-3">
        <Input
          :value="judge.date"
          :label="'Dagsetning'"
          :disabled="disabled"
          @input="judge.shortName = $event"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 offset-md-1 mb-md-3">
        <Select
          :value="judge.clubId"
          :label="'Félag'"
          :options="clubs"
          :disabled="disabled"
          @change="judge.clubId = $event"
        />
      </div>

      <div class="col-sm-3 offset-md-1 col-md-3 mb-md-3">
        <Input
          :value="judge.id"
          :label="'Númer'"
          :readonly="true"
          :disabled="disabled"
          @input="judge.id = $event"
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
          @click.prevent="$emit('save', judge)"
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
  name: 'EditJudge',
  components: {
    Alert,
    Input,
    Select,
    Button
  },
  props: {
    judge: {
      type: Object,
      required: true
    },
    clubs: {
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
