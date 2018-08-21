<!-- =================================================
 Vue Template
================================================== -->
<template>
    <v-touch
      class="dot"
      :style="getDotStyle"
      @tap="openBalloon"
      >
    </v-touch>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'hazard-dot',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 10
    }
  },
  props: {
    radius: Number,
    color: String,
    initialPos: Object,
    currentPos: Object,
    discovered: Boolean,
    id: Number,
    isActiveBalloon: Boolean
  },
  watch: {
    // when this dot is discovered, open the balloon
    discovered (val) {
      if (val === true) {
        this.openBalloon()
      }
    }
  },
  computed: {
    getDotStyle () {
      return {
        'left': this.currentPos.x - this.radius + 'px',
        'top' : this.currentPos.y - this.radius + 'px',
        'width': this.radius * 2 + 'px',
        'height': this.radius * 2 + 'px',
        'border-radius': this.radius + 'px',
        'background-color': this.color
      }
    }
  },
  methods: {
    openBalloon (e) {
      console.log('in HazardDot, openBalloon()', e)
      if (this.isActiveBalloon) {
        console.log('in HazardDot, there is an active balloon, so close it')
        // if the balloon is already displayed, close it
        this.$emit('close-balloon')
      } else {
        console.log('in HazardDot, there is no active balloons, so lets open a new balloon', this.id)
        // if not, open this balloon
        this.$emit('open-balloon', this.id)
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.dot {
  position: absolute;
}
</style>
