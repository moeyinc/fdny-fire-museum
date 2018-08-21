<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="app-button-wrapper"
    :style="{'float' : float}"
    @click="pageTransition">
    <img
      :src="getImageAssetFilePath(img)"
      class="app-button"/>
    <span
      class="blink-text blinking"
      :style="{'font-size': blinkTextSize,
                'top'     : blinkTextTop,
                'left'    : blinkTextLeft
              }">
      {{ blinkText }}
    </span>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'app-button',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 8,
      usualElev: 8,
      raisedElev: 16
    }
  },
  props: {
    img: String,
    blinkText: String,
    blinkTextSize: String,
    blinkTextTop: String,
    blinkTextLeft: String,
    float: String,
    clickable: Boolean,
    destination: String,
    customElev: Number
  },
  created () {
    // set a custom elevation
    if (this.customElev !== undefined) {
      this.elev = this.customElev
      this.usualElev = this.customElev
    }
  },
  watch: {
    isActive (val) {
      if (val === true) {
        // active
        this.elev = this.raisedElev
      } else {
        // inactive
        this.elev = this.usualElev
      }
      // re-apply shadow
      this.applyShadow()
    }
  },
  methods: {
    // transit to a specified page
    pageTransition () {
      if (this.clickable) {
        this.$router.push({ name: this.destination })
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.app-button-wrapper {
  position: relative;
  border-radius: 30px;
}

.app-button {
  width: 800px;
  height: 900px;
  float: left;
}

.blink-text {
  position: absolute;
  font-family: 'Century Gothic Bold';
  color: #FEFEFE;
  z-index: 3000;
  font-size: 72px;
  letter-spacing: .1px;
  line-height: 72px;
}

@-webkit-keyframes pulse {
 from {
   opacity: 1.0;
 }
 to {
   opacity: 0;
 }
}

.blinking {
  -webkit-animation-name: pulse;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-iteration-count:infinite;
  -webkit-animation-timing-function:ease-in-out;
  -webkit-animation-direction: alternate;
  -webkit-animation-delay: 0s;
}

</style>
