<template>
  <div class="timesheet">
    <div class="timesheet-header">
      <div class="header-current">
        <h6>{{ current && current[0].confirmed ? 'Staðfest' : 'Óstaðfest' }} skráning</h6>
        <div v-if="current && current.length">
          <small class="d-block">Skráð: {{ current[0].sentAt | formatDate }}</small>
          <small class="d-block">Notandi: {{ current[0].sentByName }}</small>
          <small class="d-block">Staðfest: {{ current[0].confirmedAt | formatDate }}</small>
        </div>
      </div>

      <div
        v-if="!disabled"
        class="header-pending"
      >
        <h6>Ný tillaga</h6>

        <div v-if="pending && pending.length">
          <small class="d-block">Dags: {{ pendingDate | formatDate }}</small>
          <small class="d-block">Notandi: {{ pendingUser }}</small>
        </div>

        <div v-if="!(pending && pending.length)">
          <button
            class="btn btn-sm btn-outline-secondary mt-2"
            @click.prevent="addMembership"
          >
            Byrja
          </button>
        </div>
      </div>
    </div>

    <div class="timesheet-body">
      <div class="membership-current">
        <div
          v-for="membership in current"
          :key="membership.clubId + '-' + membership.from"
          class="card my-3 "
        >
          <div class="card-body py-3">
            <h5 class="card-title">
              {{ membership.clubFullName || membership.legacyClub }}
            </h5>
            <div class="form-group form-row d-none d-lg-flex">
              <label class="col-auto col-form-label col-form-label-sm">Frá:</label>
              <div class="col-md-4">
                <input
                  :value="membership.from"
                  type="text"
                  class="form-control form-control-plaintext form-control-sm"
                  placeholder="Fra"
                  @input="membership.from = $event.target.value"
                >
              </div>

              <label class="col-auto col-form-label col-form-label-sm">Til:</label>
              <div class="col-md-4">
                <input
                  :value="membership.to"
                  type="text"
                  class="form-control form-control-plaintext form-control-sm"
                  placeholder="Til"
                  @input="membership.to = $event.target.value"
                >
              </div>
            </div>
            <small
              v-if="membership.legacyClub"
              class="text-muted"
            >
              Aðili var skráður í íþróttahérað (<em>{{ membership.legacyClub }}</em>) en ekki félag í gamla grunninum. Vinsamlegast lagið.
            </small>
          </div>
        </div>
      </div>

      <div
        v-if="!disabled"
        class="membership-pending"
      >
        <div
          v-for="(membership, index) in pending"
          :key="membership.clubId + '-' + membership.from"
          class="card my-3 border-secondary"
        >
          <div class="card-body py-3">
            <div class="form-row">
              <div class="col-md-11 text-left">
                <h5 class="card-title">
                  {{ membership.clubFullName || membership.legacyClub }}
                </h5>
              </div>
              <div class="col-md-1 text-right">
                <button
                  class="btn btn-sm btn-warning-outline mt-n1"
                  title="Fjarlægja félag"
                  @click.prevent="removeClub(index)"
                >
                  <i class="fas fa-times" />
                </button>
              </div>
            </div>
            <div class="form-group form-row d-none d-lg-flex">
              <label class="col-md-2 col-form-label col-form-label-sm text-right">Frá:</label>
              <div class="col-md-4">
                <input
                  v-mask="'####-##-##'"
                  :value="membership.from"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Fra"
                  :disabled="disabled"
                  @input="changeDate($event, membership, 'from')"
                >
              </div>

              <label class="col-md-2 col-form-label col-form-label-sm text-right">Til:</label>
              <div class="col-md-4">
                <input
                  :value="membership.to"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Til"
                  :disabled="disabled"
                  @input="changeDate($event, membership, 'to')"
                >
              </div>
            </div>
            <div class="form-group form-row d-none d-lg-flex">
              <label class="col-md-2 col-form-label col-form-label-sm text-right">Félag:</label>
              <div class="col-md-10">
                <select
                  :value="membership.clubId"
                  :disabled="disabled"
                  class="form-control form-control-sm"
                  @change="changeClub($event, membership)"
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
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            v-if="pending && pending.length"
            class="btn btn-sm btn-outline-secondary"
            title="Bæta við félagi"
            @click.prevent="addClub"
          >
            <i class="fas fa-plus" />
          </button>
        </div>

        <div class="text-center mt-3" v-if="pending && pending.length">
          <small>{{ confirmationMessage }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import debounce from 'lodash.debounce'
import { isValid, format, startOfYesterday, startOfToday } from 'date-fns'
import { getUser } from '../user'

export default {
  name: 'AdminMembership',
  directives: {
    mask
  },
  filters: {
    formatDate (val) {
      if (val) {
        const valDate = new Date(val)
        return format(valDate, 'yyyy-MM-dd') + ' kl. ' + format(valDate, 'HH:mm:ss')
      }
    }
  },
  props: {
    current: Array,
    pending: Array,
    clubs: Array,
    disabled: Boolean,
    admin: Boolean    
  },
  created() {
    console.log('membership', this.admin)
  },
  computed: {
    confirmationMessage() {
      console.log('membership', this.admin)
      if (this.admin) {
        return 'Tillagan þín verður samþykkt um leið og þú smellir á vista þar sem þú ert stjórnandi.'
      }

      return 'Tillagan þín verður send inn til staðfestingar. Í millitíðinni mun núverandi skráning haldast óbreytt en síðan uppfærast um leið og skrifstofa FRÍ samþykkir tillöguna.'
    },
    pendingDate () {
      if (this.pending.length) {
        return this.pending[0].sentAt
      } else {
        return this.formatDate(new Date())
      }
    },
    pendingUser () {
      if (this.pending.length) {
        return this.pending[0].sentByName
      } else {
        return 'Bergur Hallgrímsson' // Sækja úr köku
      }
    }
  },
  methods: {
    addMembership () {            
      const user = getUser()
      const date = new Date()
      this.current.forEach(item => {
        this.pending.push({
          clubId: item.clubId,
          clubFullName: item.clubFullName,
          from: item.from,
          to: item.to,
          sentAt: date,
          sentBy: user.id,
          sentByName: user.fullName
        })
      })

      this.$emit('membershipSuggestion', this.pending)
    },
    removeClub (index) {
      this.pending.splice(index, 1)

      if (this.pending.length === 0) {
        this.$emit('membershipSuggestion', this.pending)
      }
    },
    addClub () {
      const lastItem = this.pending[this.pending.length - 1]
      lastItem.to = format(startOfYesterday(), 'yyyy-MM-dd')

      this.pending.push({
        clubId: null,
        clubFullName: ' ',
        from: format(startOfToday(), 'yyyy-MM-dd'),
        modifiedAt: this.pendingDate,
        modifiedBy: 1,
        modifiedByName: 'Bergur Hallgrímsson' // Sækja úr köku
      })
    },
    formatDate (val) {
      if (val) {
        const valDate = new Date(val)
        return format(valDate, 'yyyy-MM-dd') + ' kl. ' + format(valDate, 'HH:mm:ss')
      }
    },
    changeClub (e, membership) {
      const clubId = Number(e.target.value)
      const foundClub = this.clubs.find(c => c.id === clubId)
      membership.clubId = clubId
      membership.clubFullName = foundClub.fullName
    },
    changeDate: debounce(function (event, membership, field) {
      if (event.target.value) {
        const val = new Date(event.target.value)
        
        // REFACTOR: Dummy validation
        if (val.getFullYear() >= 1800 && isValid(val)) {
          membership[field] = event.target.value
        }
      } else {
        membership[field] = undefined
      }
    }, 1000)
  }
}
</script>

<style scoped>
.card {
  height: 180px;
}
.timesheet {
  position: relative;
}
.timesheet-header,
.timesheet-body {
  display: flex;
  justify-content: space-between;
}
.timesheet-header {
  height: 5rem;
  text-align: center;
}

.timesheet-header > .header-current {
  width: 48%;
  border-left: 1px solid rgba(0,0,0,.125);
  border-right: 1px solid rgba(0,0,0,.125);
}
.timesheet-body > .membership-current {
  display: block;
  width: 48%;
}

.timesheet-header > .header-pending {
  width: 48%;
  border-left: 1px solid rgb(108, 117, 125);
  border-right: 1px solid rgb(108, 117, 125);
}
.timesheet-body > .membership-pending {
  display: block;
  width: 48%;
}

</style>>
