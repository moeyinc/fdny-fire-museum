<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    v-show="isSVGReady"
    class="button-container"
    :style="[getButtonStyle, getBGColor]"
    @mousedown="toggle"
    @mouseup="toggle"
    @mouseleave="resetClick"
    @click="buttonClicked">

  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'
import MixinSVG from '@/mixins/svg.js'

export default {
  name: 'toolbar-button',
  mixins: [MixinMaterials, MixinSVG],
  data () {
    return {
      elev: 2,
      usualElev: 2,
      raisedElev: 16,
      isActive: false,
      isSVGReady: false
    }
  },
  props: {
    pause: Boolean,
    segmentId: String,
    buttonVal: String,
    img: String,
    width: Number,
    height: Number,
    float: String,
    padding: Number,
    borderRadius: Number,
    top: Number,
    regularBgColor: String,
    activeBgColor: String,
    regularFillColor: String,
    activeFillColor: String,
    customElev: Number
  },
  created () {
    // set a custom elevation
    if (this.customElev !== undefined) {
      this.elev = this.customElev
      this.usualElev = this.customElev
    }
  },
  mounted () {
    // svg is not ready
    this.isSVGReady = false

    // generate inline svg
    this.generateInlineSVG(this.$el)

    // now the svg is ready to show
    this.isSVGReady = true
  },
  computed: {
    getButtonStyle () {
      return {
        'width': this.width + 'px',
        'height': this.height + 'px',
        'float': this.float,
        'padding': this.padding + 'px',
        'border-radius': this.borderRadius + 'px',
        'top': this.top + 'px'
      }
    },
    // change background color when it's clicked
    getBGColor () {
      if (this.isActive) {
        return {'background-color': this.activeBgColor}
      } else {
        return {'background-color': this.regularBgColor}
      }
    }
  },
  watch: {
    // change elevation and svg fill color
    isActive (val) {
      let svg = this.$el.getElementsByClassName('svg')[0]

      if (val === true) {
        // active
        this.elev = this.raisedElev
        svg.style.fill = this.activeFillColor
      } else {
        // inactive
        this.elev = this.usualElev
        svg.style.fill = this.regularFillColor
      }
      // re-apply shadow
      this.applyShadow()
    },
    buttonVal (val) {
      // svg is not ready
      this.isSVGReady = false

      // generate inline svg
      this.generateInlineSVG(this.$el)

      // now the svg is ready to show
      this.isSVGReady = true
    }
  },
  methods: {
    // switch the active value to change the background color
    toggle () {
      if (!this.pause) {
        this.isActive = !this.isActive
      }
    },
    // reset the active value when leaving your mouse
    resetClick () {
      if (!this.pause) {
        this.isActive = false
      }
    },
    buttonClicked () {
      if (!this.pause) {
        this.$emit('button-clicked', {id: this.segmentId, val: this.buttonVal})
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.button-container {
  position: relative;
}
</style>
