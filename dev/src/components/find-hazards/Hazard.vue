<!-- =================================================
 Vue Template
================================================== -->
<template>
    <div class="hazard-wrapper">
      <hazard-dot
        v-show="dot.discovered"
        :radius="hazardSettings.dotRadius"
        :color="hazardSettings.dotColor"
        :initial-pos="dot.initialPos"
        :current-pos="dot.currentPos"
        :discovered="dot.discovered"
        :id="id"
        :is-active-balloon="isActiveBalloon"
        @open-balloon="openBalloon"
        @close-balloon="closeBalloon"
      />
      <hazard-balloon
        v-if="isActiveBalloon"
        :title="balloon.title"
        :description="balloon.description"
        :image-path="balloon.imagePath"
        :has-title="hazardSettings.hasBalloonTitle"
        :has-image="hazardSettings.hasBalloonImage"
        :base-box-width="hazardSettings.baseBoxWidth"
        :dot-radius="hazardSettings.dotRadius"
        :dot-color="hazardSettings.dotColor"
        :dot-pos="dot.currentPos"
        :stage-width="stageWidth"
        :stage-height="stageHeight"
        />
    </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import HazardDot from './HazardDot'
import HazardBalloon from './HazardBalloon.vue'

export default {
  name: 'hazard',
  components: {
    HazardDot,
    HazardBalloon
  },
  props: {
    hazardSettings: Object,
    dot: Object,
    balloon: Object,
    id: Number,
    stageWidth: Number,
    stageHeight: Number,
    isActiveBalloon: Boolean
  },
  methods: {
    openBalloon (id) {
      this.$emit('open-balloon', id)
    },
    closeBalloon () {
      this.$emit('close-balloon')
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
</style>
