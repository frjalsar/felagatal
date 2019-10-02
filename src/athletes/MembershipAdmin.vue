<template>
<div class="timesheet">
 
  <div class="timesheet-header">

    <div class="header-current" v-if="current && current.length">
      <h6>Núverandi skráning</h6>
      <div v-if="current && current.length">
        <small class="d-block">Dags: {{ formatDate(current[0].modifiedAt) }}</small> 
        <small class="d-block">Notandi: {{ current[0].modifiedByName }}</small> 
      </div>
    </div>

    <div class="header-pending" v-if="pending && pending.length > 0">
      <h6>Ný tillaga</h6>

      <div>
        <small class="d-block">Dags: {{ formatDate(pending[0].modifiedAt) }}</small>
        <small class="d-block">Notandi: {{ pending[0].modifiedByName }}</small> 
      </div>

      <div v-if="false">
        <button class="btn btn-sm btn-outline-secondary mt-2" @click="$emit('newMembership')">Byrja</button>
      </div>

    </div>  
  </div> 

  <div class="timesheet-body">
  
    <div class="membership-current">
      <div class="card my-3 " v-for="membership in current" :key="membership.clubId + '-' + membership.from">      
        <div class="card-body py-3">        
          <h5 class="card-title">{{ membership.clubFullName ||  membership.legacyClub }}</h5>
          <div class="form-group form-row d-none d-lg-flex">
            <label class="col-auto col-form-label col-form-label-sm">Frá:</label>
            <div class="col-md-4">
              <input
                :value="membership.from"
                type="text"
                class="form-control form-control-plaintext form-control-sm"
                placeholder="Fra"
                :disabled="disabled"
                @input="membership.from = $event.target.value"
              />
            </div>         
            
            <label class="col-auto col-form-label col-form-label-sm">Til:</label>
            <div class="col-md-4">
              <input
                :value="membership.to"
                type="text"
                class="form-control form-control-plaintext  form-control-sm"
                placeholder="Til"
                :disabled="disabled"
                @input="membership.to = $event.target.value"
              />
            </div>        
          </div>
          <small class="text-muted" v-if="membership.legacyClub">
            Aðili var skráður í íþróttahérað (<em>{{ membership.legacyClub }}</em>) en ekki félag í gamla grunninum. Vinsamlegast lagið.
          </small>
        </div>
      </div>
    </div>


    <div class="membership-pending">
      <div class="card my-3 border-secondary" v-for="membership in pending" :key="membership.clubId + '-' + membership.from">     
        <div class="card-body py-3">
          <h5 class="card-title">{{ membership.clubFullName ||  membership.legacyClub }}</h5>
          <div class="form-group form-row d-none d-lg-flex">
            <label class="col-auto col-form-label col-form-label-sm">Frá:</label>
            <div class="col-md-4">
              <input
                :value="membership.from"
                type="text"
                class="form-control form-control-sm"
                placeholder="Fra"
                :disabled="disabled"
                v-mask="'####-##-##'"
                @input="changeDate($event, membership, 'from')"
              />
            </div>         
            
            <label class="col-auto col-form-label col-form-label-sm">Til:</label>
            <div class="col-md-4">
              <input            
                :value="membership.to"
                type="text"
                class="form-control form-control-sm"
                placeholder="Til"
                :disabled="disabled"
                @input="changeDate($event, membership, 'to')"
              />
            </div>        
          </div>        
          <div class="form-group form-row d-none d-lg-flex">
            <label class="col-auto col-form-label col-form-label-sm">Félag:</label>
            <div class="col-md-9">
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
                  {{ club.fullName}}
                </option>
              </select>
            </div>          
          </div>
        </div>
      </div>
    </div>
    
  </div>  
    
</div>
</template>

<script>
import { mask } from 'vue-the-mask'
import debounce from 'lodash.debounce'
import { differenceInYears, differenceInMonths, addMonths, isValid, format} from 'date-fns'
export default {
  name: 'AdminMembership',
  directives: {
    mask
  },
  props: {
    current: Array,
    pending: Array,
    clubs: Array,
    disabled: Boolean
  },    
  methods: {
    formatDate (val) {
      if (val) {
        const valDate = new Date(val)
        return format(valDate, 'yyyy-MM-dd') + ' kl. ' + format(valDate, 'HH:mm:ss')       
      }      
    },    
    changeClub(e, membership) {
      const clubId = Number(e.target.value)
      const foundClub = this.clubs.find(c => c.id === clubId)
      membership.clubId = clubId
      membership.clubFullName = foundClub.fullName      
    },
    changeDate: debounce(function(event, membership, field) {
      const val = new Date(event.target.value)
    
      if (val.getFullYear() >= 1800 && isValid(val)) {
        membership[field] = event.target.value
      }      
    },1000)    
  }
}
</script>

<style scoped>

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
