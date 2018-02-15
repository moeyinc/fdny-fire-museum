<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="kitchen-wrapper" :style="getBGImage">
    <app-button
      :img="'kitchen/FIRE_SAFETY_TOOLS.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'left'"
      :clickable="true"
      :destination="'K10'"
    />
    <app-button
      :img="'kitchen/FIND_KITCHEN_FIRE_HAZARDS.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'right'"
      :clickable="true"
      :destination="'K20'"
    />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'kitchen',
  components: {
    AppButton
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url(' + this.getImageAssetFilePath('kitchen/find-fire-hazards/stage_blurred_mono.png') + ')',
        'background-repeat': 'no-repeat',
        'background-position': 0 + 'px 0px',
        'background-size': 'auto ' + 1080 + 'px'
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#kitchen-wrapper {
  height: 100%;
  background-color: #F5F5F5;
  padding: 90px 120px;
}
</style>
