<template>
  <form>
    <div class="row">
      <div class="col-md-6 offset-md-1 mb-md-3">
        <Input
          :value="athlete.fullName"
          :label="'Fullt nafn'"
          :disabled="disabled"
          @input="athlete.fullName = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Input
          :value="athlete.kt"
          :label="'Kennitala'"
          :disabled="disabled"
          @input="athlete.kt = $event"
        />
      </div>

      <div class="col-md-2 mb-md-3">
        <Input
          :value="athlete.birthyear"
          :label="'Fæðingarár'"
          :disabled="disabled"
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
          :disabled="disabled"
          @change="athlete.gender = $event"
        />
      </div>

      <div class="col-md-4 mb-md-3">
        <Select
          :value="athlete.country"
          :label="'Land'"
          :options="countries"
          :disabled="disabled"
          @change="athlete.country = $event"
        />
      </div>

      <div class="col-sm-6 col-md-2 mb-md-3">
        <Input
          :value="athlete.id"
          :label="'Númer'"
          :readonly="true"
          :disabled="disabled"
          @input="athlete.id = $event"
        />
      </div>

      <div class="col-sm-6 col-md-2 mb-md-3">
        <Input
          :value="athlete.thorId"
          :label="'Þór númer'"
          :readonly="true"
          :disabled="disabled"
          @input="athlete.thorId = $event"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <legend class="col-form-label">
          Félagasaga:
        </legend>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1 offset-md-1">
        <Timeline
          :start="startYear"
          :end="endYear"
          :membership="athlete.membership"
        />
      </div>
      <div class="col-md-8">
        <MembershipAdmin
          :user="user"
          :current="athlete.membership"
          :pending="athlete.pendingMembership"
          :clubs="clubs"
          :admin="admin"
          :disabled="disabled"
          @membershipSuggestion="updateAthlete"
        />
      </div>

      <div class="col-md-1">
        <Timeline
          v-if="!disabled"
          :start="startYear"
          :end="endYear"
          :membership="athlete.pendingMembership"
          year-alignment="right"
          background-style="#6c757d"
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
          class="btn btn-secondary"
          :label="saveMessage"
          :disabled="disabled"
          @click.prevent="$emit('save', athlete)"
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
import Timeline from './Timeline'
import MembershipAdmin from './MembershipAdmin'

export default {
  name: 'EditAthlete',
  components: {
    Alert,
    Input,
    Select,
    Button,
    Timeline,
    MembershipAdmin
  },
  props: {
    athlete: {
      type: Object,
      required: true
    },
    clubs: {
      type: Array,
      required: true
    },
    countries: {
      type: Array,
      required: true
    },
    genders: {
      type: Array,
      required: true
    },
    alert: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => undefined
    }
  },
  computed: {
    saveMessage () {
      if (this.athlete.pendingMembership && this.athlete.pendingMembership.length > 0) {
        if (this.admin) {
          return 'Vista og samþykkja tillögu'
        } else {
          return 'Vista og senda inn tillögu'
        }
      }

      return 'Vista'
    },
    startYear () {
      if (this.athlete.membership) {
        const current = this.athlete.membership
          .map(m => new Date(m.from))
          .sort((a, b) => a - b)

        const pending = this.athlete.pendingMembership
          .map(m => new Date(m.from))
          .sort((a, b) => a - b)

        const min = Math.min(current[0], pending[0]) || current[0]
        return new Date(min).getFullYear()
      }

      return undefined
    },
    endYear () {
      if (this.athlete.membership) {
        const current = this.athlete.membership
          .map(m => m.to ? new Date(m.to) : new Date())
          .sort((a, b) => b - a)

        const pending = this.athlete.pendingMembership
          .map(m => m.to ? new Date(m.to) : new Date())
          .sort((a, b) => b - a)

        const max = Math.min(current[0], pending[0]) || current[0]
        return new Date(max).getFullYear()
      }

      return undefined
    }
  },
  methods: {
    updateAthlete (pendingMembership) {
      this.athlete.pendingMembership = pendingMembership
    }
  }
}
</script>
