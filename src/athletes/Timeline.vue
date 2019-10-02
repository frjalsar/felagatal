  <template>
  <div
    class="timeline my-4"
    :style="{
      'height': 30 * years.length + 'px'
    }"
  >   
    <div      
       v-for="item in data"
      :key="item.id"
      :style="{
        'top': calcPosition(item.from) + '%',
        'height': calcSize(item.from, item.to) + '%',
        'background': background
      }"
      :title="item.clubFullName || item.legacyClub"
      class="timeline-item"
    >    
      <small :class="{
        'leftSide': alignYear !== 'right',
        'rightSide': alignYear === 'right'
      }">{{ item.from}}</small>    
    </div>   

</div>
</template>

<script>
import { differenceInMonths, addMonths } from 'date-fns'
export default {
  name: 'Timeline',
  props: {
    start: Number,
    end: Number,
    alignYear: String,
    data: Array,
    background: String
  },
  computed: {
    years() {
      const years = []

      for (let year = this.start; year <= this.end; year++) {
        years.push(year)
      }

      return years    
    }
  },
  methods: {
    calcPosition(from) {
      const monthSize = 100 / this.years.length / 12      
      const fromDate = new Date(from)
      const startDate = new Date(this.years[0], 0, 1)
      
      const monthCount = differenceInMonths(fromDate, startDate)            
      return Math.round(monthCount * monthSize * 100) / 100
    },
    calcSize(from, to) {
      const monthSize = 100 / this.years.length / 12      
      const fromDate = new Date(from)
      const toDate = to ? new Date(to) : new Date()
      
      const monthCount = differenceInMonths(toDate, addMonths(fromDate,1)) + 1    
      return Math.round(monthCount * monthSize * 100) / 100
    },
  }
}
</script>

<style lang="css" scoped>
.timeline {
  position: relative;
  width: 100%;  
}

.timeline > .timeline-item {  
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.125);
  border-radius: 0.25rem;  
}


.timeline  > .timeline-item > small.leftSide {
  position: relative;
  left: -75px;
  white-space: nowrap
}

.timeline  > .timeline-item > small.rightSide {
  position: relative;
  right: -75px;
  white-space: nowrap
}


</style>