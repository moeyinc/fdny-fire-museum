<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="find-hazards-stage-wrapper">
    <swipe-indicator left
      v-if="hasSpaceAtLeft"
      :screen-height="screenHeight"/>
    <swipe-indicator right
      v-if="hasSpaceAtRight"
      :screen-height="screenHeight"/>
    <v-touch
      class="stage-image-container"
      :style="getBGImage"
      @touchstart.native="startDragging($event)"
      @touchend.native="stopDragging($event)"
      @tap="seekHazard"
      @touchmove.native="drag($event)"
      @touchcancel.native="stopDragging($event)"
      >
      <hazard
        v-for="(hazard, index) in hazards"
        :hazard-settings="hazardSettings"
        :dot="hazard.dot"
        :balloon="hazard.balloon"
        :stage-width="stageWidth"
        :stage-height="stageHeight"
        :key="index"
        :id="index"
        :is-active-balloon="isActiveBalloon(index)"
        @open-balloon="openBalloon"
        @close-balloon="closeBalloon"
      />
    </v-touch>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import Hazard from './Hazard'
import SwipeIndicator from '@/components/find-hazards/SwipeIndicator'

export default {
  name: 'find-hazards-stag',
  components: {
    Hazard,
    SwipeIndicator
  },
  props: {
    stageImagePath: String,
    initialStagePos: Number,
    hazardSettings: Object,
    hazards: Array,
    stageWidth: Number,
    stageHeight: Number,
    showAnswersClicked: Boolean,
    screenHeight: Number
  },
  data () {
    return {
      isDragging: false,
      startDraggingPosX: 0,
      startDraggingAbsPosX: 0,
      stageImagePosX: 0,
      stageImageWidth: null,
      hitCircleRadius: 80,
      activeBalloon: -1
    }
  },
  created () {
    // set the image at the initial position
    this.stageImagePosX = this.initialStagePos

    // move the initial positions of hazard dots
    this.$emit('update-position', this.stageImagePosX)

    // get stage image width
    this.getStageImageWidth()
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url("' + this.getImageAssetFilePath(this.stageImagePath) + '")',
        'background-repeat': 'no-repeat',
        'background-position': this.stageImagePosX + 'px 0px',
        'background-size': 'auto ' + this.stageHeight + 'px'
      }
    },
    hasSpaceAtRight () {
      let pos = this.stageImagePosX
      let widthExcludingLeftEdge = this.stageImageWidth + pos
      if (widthExcludingLeftEdge > this.stageWidth + 5) return true
      return false
    },
    hasSpaceAtLeft () {
      let pos = this.stageImagePosX
      if (pos < -5) return true
      return false
    }
  },
  methods: {
    getStageImageWidth () {
      let image = new Image()
      let context = this // keep this vue model context for onload event

      image.onload = function () {
        context.stageImageWidth = image.width
        // console.log('image width is: ' + image.width)
      }
      image.src = this.getImageAssetFilePath(this.stageImagePath)
    },
    startDragging (e) {
      // console.log('in FindHazardsStage, startDragging()')
      if (this.activeBalloon < 0) {
        this.isDragging = true
        this.startDraggingPosX = e.touches[0].screenX - this.stageImagePosX
      }
      this.startDraggingAbsPosX = e.touches[0].clientX
    },
    stopDragging (e) {
      // console.log('in FindHazardsStage, stopDragging()')
      this.isDragging = false
    },
    drag (e) {
      // console.log('in FindHazardsStage, drag()')
      if (this.activeBalloon < 0) {
        if (this.isDragging) {
          let newPos = e.touches[0].screenX - this.startDraggingPosX

          // if new position is beyond the edges
          const leftEdge = this.$el.offsetWidth - this.stageImageWidth
          const rightEdge = 0
          if (newPos < leftEdge) {
            newPos = this.$el.offsetWidth - this.stageImageWidth
          } else if (newPos > rightEdge) {
            newPos = 0
          }

          // set the new position
          this.stageImagePosX = newPos
          this.$emit('update-position', this.stageImagePosX)
        }
      }
    },
    seekHazard (e) {
      // console.log('in FindHazardsStage, seekHazard()', e)
      if (e.target.className !== 'stage-image-container') return
      if (this.activeBalloon >= 0) {
        // console.log('in FindHazardsStage, lets close active balloon first', this.activeBalloon)
        e.srcEvent.stopPropagation()
        // if there is a popup balloon displayed, close it
        this.closeBalloon()
        return
      } else {
        // console.log('in FindHazardsStage, theres no active balloons. lets seek hazards')
        // get mouse pos
        let zoom = document.getElementById('app').style.zoom
        let rect = this.$el.getBoundingClientRect()
        let mouseX = e.center.x / zoom - rect.left
        let mouseY = e.center.y / zoom - rect.top

        // console.log('rect left:', rect.left)
        // console.log('rect top:', rect.top)
        // console.log('page x:', e.center.x)
        // console.log('page y:', e.center.y)

        // get the closest dot from the mouse pos
        let closestDotIndex = -1
        let closestDotDistance = 9999
        for (let i = 0; i < this.hazards.length; i++) {
          let dx = this.hazards[i].dot.currentPos.x - mouseX
          let dy = this.hazards[i].dot.currentPos.y - mouseY
          let d = Math.sqrt((dx * dx) + (dy * dy))

          // if it is the closest one ever, rewrite the closest distance
          if (d < closestDotDistance) {
            closestDotIndex = i
            closestDotDistance = d
          }
        }

        // console.log('closest dot index:', closestDotIndex)
        // console.log('closest dot dist:', closestDotDistance)

        // check if the clicked position is in the hit circle of the closest dot
        if (closestDotDistance <= this.hitCircleRadius) {
          if (!this.hazards[closestDotIndex].dot.discovered) {
            // and if the hazard hasn't been discovered

            // claim it
            this.$emit('found-hazard', closestDotIndex)
          }
        }
      }
    },
    isActiveBalloon (index) {
      if (this.activeBalloon === index) {
        return true
      } else {
        return false
      }
    },
    openBalloon (id) {
      // console.log('in FindHazardsStage, openBalloon()', id)
      this.activeBalloon = id
    },
    closeBalloon () {
      // console.log('in FindHazardsStage, closeBalloon()')
      this.activeBalloon = -1
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style>
#find-hazards-stage-wrapper {
  height: 100%;
}

.stage-image-container {
  height: 100%;
}
</style>
