<template>
  <div>
    <div class="row">
      <div class="col-md-11 offset-md-1">
        <legend class="col-form-label">
          {{ label }}
        </legend>
      </div>
    </div>

    <div
      v-for="(club, index) in membership"
      :key="club.id"
      class="row"
    >
      <div class="col-md-5 offset-md-1 mb-3">
        <select
          :value="club.id"
          :disabled="disabled"
          class="form-control"
          @input="club.id = $event.target.value"
        >
          <option
            v-for="club in clubs"
            :key="club.id"
            :value="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
      </div>

      <div class="col-md-2 mb-3">
        <input
          :value="club.from"
          type="text"
          class="form-control"
          placeholder="Fra"
          :disabled="disabled"
          @input="club.from = $event.target.value"
        >
      </div>

      <div class="col-md-2 mb-3">
        <input
          :value="club.to"
          type="text"
          class="form-control"
          placeholder="Til"
          :disabled="disabled"
          @input="club.to = $event.target.value"
        >
      </div>

      <div class="col-md-1 mb-3">
        <input
          type="hidden"
          :value="club.legacyClub"
        >
        <button
          class="btn btn-outline-secondary"
          :disabled="disabled"
          @click.prevent="removeClub(index)"
        >
          Eyða
        </button>
      </div>
      <div
        v-if="!club.id && club.legacyClub"
        class="col-md-10 offset-md-1 py-2"
      >
        <div class="alert alert-warning">
          <strong>Vinsamlegast lagið skráningu</strong>
          <p>Þessi aðili var skráður í <em>{{ club.legacyClub }}</em> í gamla grunninum sem er hugsanlega ekki rétt.</p>
          <p>Athugið að iðkendur eiga vera skráðir íþrótta- eða ungmennafélög, ekki héraðssambönd, íþróttabandlög eða gervi-lið.</p>
          <p>Sé liðið með réttu íþrótta- eða ungmennafélag þarf að stofna það sérstaklega. Vinsamlegast sendið beiðni á <a href="mailto:skraningarnefnd@fri.is">skraningarnefnd@fri.is</a></p>
        </div>
      </div>
    </div>
    <div class="row py-1">
      <div class="col-md-2 offset-md-10">
        <button
          class="btn btn-outline-secondary"
          :disabled="disabled"
          @click.prevent="addClub"
        >
          Bæta
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { format, startOfToday, startOfTomorrow } from 'date-fns'
export default {
  name: 'Membership',
  props: {
    label: String,
    membership: Array,
    clubs: Array,
    disabled: Boolean
  },
  methods: {
    removeClub (index) {
      this.membership.splice(index, 1)
    },
    addClub () {
      this.membership[this.membership.length - 1].to = format(startOfToday(), 'yyyy-MM-dd')
      this.membership.push({
        from: format(startOfTomorrow(), 'yyyy-MM-dd'),
        to: ''
      })
    }
  }
}
</script>
