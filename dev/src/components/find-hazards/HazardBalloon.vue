<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="balloon-box"
    :style="{'background-color': dotColor}"
    >
    <div class="balloon-box-header" v-if="hasTitle">
      <h5>Hazard:</h5>
    </div>
    <div class="balloon-box-body">
      <div class="text" >
        <h3 v-if="hasTitle">{{title}}</h3>
        <p v-html="description">
        </p>
      </div>
      <div
        v-if="hasImage"
        class="ref-image"
        :style="setBGImage(getImageAssetFilePath(imagePath))">
      </div>
    </div>
    <div
      class="balloon-arrow"
      :style="getArrowStyle"
      >
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'hazard-balloon',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 12,
      arrowLength: 40,
      zone: null,
      dotBoxGapX: 100, // gap between dot and balloon
      arrowOffsetY: 100, // offset from the dotPos.y for balloon's arrow
      minStageMargin: 20, // minimum margin between baloon and edge of the screen
      boxWidth: null,
      boxHeight: null,
      boxTop: null,
      boxLeft: null
    }
  },
  props: {
    title: String,
    description: String,
    imagePath: String,
    hasTitle: Boolean,
    hasImage: Boolean,
    baseBoxWidth: Number,
    dotRadius: Number,
    dotColor: String,
    dotPos: Object,
    stageWidth: Number,
    stageHeight: Number
  },
  created () {
    // identify zone
    this.identifyZone()
  },
  mounted () {
    // set box width
    this.setBoxWidth()

    // get height of the balloon's box
    this.boxHeight = this.$el.offsetHeight

    // set box position
    this.setBoxPos()
  },
  computed: {
    updateBoxPos () {
    },
    getArrowStyle () {
      if (this.zone === 'top-left' || this.zone === 'bottom-left') {
        return {
          'top': this.dotPos.y - this.boxTop + 'px',
          'right': '100%',
          'margin-top': -this.arrowLength + 'px',
          'border-color': 'transparent ' + this.dotColor + ' transparent transparent',
          'border-width': this.arrowLength + 'px'
        }
      } else if (this.zone === 'top-right' || this.zone === 'bottom-right') {
        return {
          'top': this.dotPos.y - this.boxTop + 'px',
          'left': '100%',
          'margin-top': -this.arrowLength + 'px',
          'border-color': 'transparent transparent transparent ' + this.dotColor,
          'border-width': this.arrowLength + 'px'
        }
      }
    }
  },
  methods: {
    identifyZone () {
      if (this.dotPos.x <= this.stageWidth / 2 && this.dotPos.y <= this.stageHeight / 2) {
        this.zone = 'top-left'
      } else if (this.dotPos.x <= this.stageWidth / 2 && this.dotPos.y > this.stageHeight / 2) {
        this.zone = 'bottom-left'
      } else if (this.dotPos.x > this.stageWidth / 2 && this.dotPos.y <= this.stageHeight / 2) {
        this.zone = 'top-right'
      } else if (this.dotPos.x > this.stageWidth / 2 && this.dotPos.y > this.stageHeight / 2) {
        this.zone = 'bottom-right'
      }
    },
    setBoxWidth () {
      if (this.zone === 'top-left' || this.zone === 'bottom-left') {
        // check if the base box width fits in the screen
        let boxRightEdgePos = this.dotPos.x + this.dotRadius + this.dotBoxGapX + this.baseBoxWidth
        if (boxRightEdgePos <= this.stageWidth - this.minStageMargin) {
          // if it does, just set the value to the final box width
          this.boxWidth = this.baseBoxWidth
        } else {
          // if it doesn't fit, modify the box width
          let boxLeftEdgePos = this.dotPos.x + this.dotRadius + this.dotBoxGapX
          this.boxWidth = this.stageWidth - this.minStageMargin - boxLeftEdgePos
        }
      } else if (this.zone === 'top-right' || this.zone === 'bottom-right') {
        // check if the base box width fits in the screen
        let boxLeftEdgePos = this.dotPos.x - this.dotRadius - this.dotBoxGapX - this.baseBoxWidth
        if (boxLeftEdgePos >= 0 + this.minStageMargin) {
          // if it does, just set the value to the final box width
          this.boxWidth = this.baseBoxWidth
        } else {
          // if it doesn't fit, modify the box width
          let boxRightEdgePos = this.dotPos.x - this.dotRadius - this.dotBoxGapX
          this.boxWidth = boxRightEdgePos - this.minStageMargin
        }
      }

      // set the width
      this.$el.style.width = this.boxWidth + 'px'
    },
    setBoxPos () {
      this.boxTop  = this.dotPos.y - this.arrowOffsetY

      if (this.zone === 'top-left') {
        this.boxLeft = this.dotPos.x + this.dotRadius + this.dotBoxGapX

        // check if the box top fits in the screen
        if (this.boxTop < 0 + this.minStageMargin) {
          this.boxTop = this.minStageMargin
        }
      } else if (this.zone === 'bottom-left') {
        this.boxLeft = this.dotPos.x + this.dotRadius + this.dotBoxGapX

        // check if the box bottom fits in the screen
        let boxBottom = this.dotPos.y - this.arrowOffsetY + this.boxHeight
        if (boxBottom > this.stageHeight - this.minStageMargin) {
          this.boxTop = this.stageHeight - this.minStageMargin - this.boxHeight
        }
      } else if (this.zone === 'top-right') {
        this.boxLeft = this.dotPos.x - this.dotRadius - this.dotBoxGapX - this.boxWidth

        // check if the box top fits in the screen
        if (this.boxTop < 0 + this.minStageMargin) {
          this.boxTop = this.minStageMargin
        }
      } else if (this.zone === 'bottom-right') {
        this.boxLeft = this.dotPos.x - this.dotRadius - this.dotBoxGapX - this.boxWidth

        // check if the box bottom fits in the screen
        let boxBottom = this.dotPos.y - this.arrowOffsetY + this.boxHeight
        if (boxBottom > this.stageHeight - this.minStageMargin) {
          this.boxTop = this.stageHeight - this.minStageMargin - this.boxHeight
        }
      }

      // set the position
      this.$el.style.top  = this.boxTop + 'px'
      this.$el.style.left = this.boxLeft + 'px'
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.balloon-box {
  position: absolute;
  border-radius: 25px;
  padding: 40px;
}

.balloon-box-header h5 {
  font-size: 24px;
  color: #fefefe;
}

.balloon-box-body {
  display: table;
}

.text {
  display: table-cell;
  width: 60%;
  font-size: 28px;
  padding-right: 20px;
}

.text h3 {
  font-size: 42px;
  margin-bottom: 20px;
  color: #DA291C;
}

.ref-image {
  display: table-cell;
  width: 40%;
  height: 100%;
}

.balloon-arrow {
  position: absolute;
  border-style: solid;
}

</style>
