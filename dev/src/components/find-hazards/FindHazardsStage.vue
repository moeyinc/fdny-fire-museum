<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="find-hazards-stage-wrapper">
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

export default {
  name: 'find-hazards-stag',
  components: {
    Hazard
  },
  props: {
    stageImagePath: String,
    initialStagePos: Number,
    hazardSettings: Object,
    hazards: Array,
    stageWidth: Number,
    stageHeight: Number,
    showAnswersClicked: Boolean
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
    }
  },
  methods: {
    getStageImageWidth () {
      let image = new Image()
      let context = this // keep this vue model context for onload event

      image.onload = function () {
        context.stageImageWidth = image.width
        console.log('image width is: ' + image.width)
      }
      image.src = this.getImageAssetFilePath(this.stageImagePath)
    },
    startDragging (e) {
      if (this.activeBalloon < 0) {
        this.isDragging = true
        this.startDraggingPosX = e.touches[0].screenX - this.stageImagePosX
      }
      this.startDraggingAbsPosX = e.touches[0].clientX
    },
    stopDragging (e) {
      this.isDragging = false
    },
    drag (e) {
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
      // e.srcEvent.stopPropagation()
      console.log('seekHazard', e)
      // let draggedDistance = Math.abs(this.startDraggingAbsPosX - e.changedTouches[0].clientX)

      // if (draggedDistance > 10) {
      //   console.log('canceled seeking hazards because you are dragging')
      //   // when it's being dragged, don't try to find a hazard
      //   return
      // } else
      if (this.activeBalloon >= 0) {
        console.log('balloon is active', this.activeBalloon)
        // if there is a popup balloon displayed, close it
        this.closeBalloon()
        return
      } else {
        console.log('lets seek hazards')
        // get mouse pos
        let zoom = document.getElementById('app').style.zoom
        let rect = this.$el.getBoundingClientRect()
        let mouseX = e.center.x / zoom - rect.left
        let mouseY = e.center.y / zoom - rect.top

        console.log('rect left:', rect.left)
        console.log('rect top:', rect.top)
        console.log('page x:', e.center.x)
        console.log('page y:', e.center.y)

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

        console.log('closest dot index:', closestDotIndex)
        console.log('closest dot dist:', closestDotDistance)

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
      console.log('openBalloon', id)
      this.activeBalloon = id
    },
    closeBalloon () {
      console.log('closeBalloon')
      this.activeBalloon = -1
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#find-hazards-stage-wrapper {
  height: 100%;
}

.stage-image-container {
  height: 100%;
}
</style>
