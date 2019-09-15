<template>
<div class="form-group row">
  <legend class="col-form-label col-sm-3 text-right">
    {{ label }}
  </legend>
  <div class="col-sm-9 text-left">
    <div
      v-for="(club, index) in membership"
      :key="club.id"
      class="form-row py-1"
    >
      <div class="col-md-5">
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
            {{ club.fullName}}
          </option>
      </div>

      <div class="col-md-3">
        <input
          :value="club.from"
          type="text"
          class="form-control"
          placeholder="Fra"
          :disabled="disabled"
          @input="club.from = $event.target.value"
        />
      </div>

      <div class="col-md-3">
         <input
          :value="club.to"
          type="text"
          class="form-control"
          placeholder="Til"
          :disabled="disabled"
          @input="club.to = $event.target.value"
        />
      </div>

      <div class="col-md-1">
        <input
          type="hidden"
          :value="club.legacyClub"
        />
        <button
          class="btn btn-default"
          :disabled="disabled"
          @click.prevent="removeClub(index)"
        >
          -
        </button>
      </div>
      <div
        v-if="!club.id && club.legacyClub"
        class="col-md-12 py-2"
      >
        <div class="alert alert-warning">
          <strong>Vinsamlegast lagið skráningu</strong>
          <p>Þessi aðili var skráður í <em>{{ club.legacyClub }}</em> í gamla grunninum sem er hugsanlega ekki rétt.</p>
          <p>Athugið að iðkendur eiga vera skráðir íþrótta- eða ungmennafélög, ekki héraðssambönd, íþróttabandlög eða gervi-lið.</p>
          <p>Sé liðið með réttu íþrótta- eða ungmennafélag þarf að stofna það sérstaklega. Vinsamlegast sendið beiðni á <a href="mailto:skraningarnefnd@fri.is">skraningarnefnd@fri.is</a></p>
        </div>
      </div>
    </div>
    <div class="form-row py-1">
      <div class="col-md-1 offset-md-11">
        <button
          class="btn btn-default"
          :disabled="disabled"
          @click.prevent="addClub"
        >
          +
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
      this.membership[this.membership.length -1].to = format(startOfToday(), 'yyyy-MM-dd')
      this.membership.push({
        from: format(startOfTomorrow(), 'yyyy-MM-dd'),
        to: ''
      })
    }
  }
}
</script>

