<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="living-room-wrapper" :style="getBGImage">
    <app-button
      :img="'living-room/MAKE_YOUR_FAMILY_ESCAPE_PLAN.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'left'"
      :clickable="true"
      :destination="'L10'"
    />
    <app-button
      :img="'living-room/FIND_LIVING_ROOM_FIRE_HAZARDS.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'right'"
      :clickable="true"
      :destination="'L20'"
    />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import AppButton from '@/components/AppButton.vue'
import s from '@/components/living-room/store_sketch.js'

export default {
  name: 'living-room',
  components: {
    AppButton
  },
  mounted () {
    // clear the shared paths drawn in the sketchpad
    s.store.clearSharedPaths()
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url(' + this.getImageAssetFilePath('living-room/find-fire-hazards/stage_blurred_mono.png') + ')',
        'background-repeat': 'no-repeat',
        'background-position': -1500 + 'px 0px',
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
#living-room-wrapper {
  height: 100%;
  background-color: #F5F5F5;
  padding: 90px 120px;
}
</style>
