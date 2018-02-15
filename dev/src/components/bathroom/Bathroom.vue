<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="bathroom-wrapper" :style="getBGImage">
    <app-button
      :img="'bathroom/FIND_BATHROOM_FIRE_HAZARDS.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'left'"
      :clickable="true"
      :destination="'BA10'"
    />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'bathroom',
  components: {
    AppButton
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url(' + this.getImageAssetFilePath('bathroom/find-fire-hazards/stage_zoomed_blurred_mono.png') + ')',
        'background-repeat': 'no-repeat',
        'background-position': -1350 + 'px 0px',
        'background-size': 'auto ' + 1920 + 'px'
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#bathroom-wrapper {
  height: 100%;
  background-color: #F5F5F5;
  padding: 510px 140px;
}
</style>
