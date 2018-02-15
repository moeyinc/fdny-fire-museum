<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="bedroom-wrapper" :style="getBGImage">
    <app-button
      :img="'bedroom/STAY_LOW_AND_GO.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'left'"
      :clickable="true"
      :destination="'BE10'"
    />
    <app-button
      :img="'bedroom/FIND_BEDROOM_FIRE_HAZARDS.png'"
      :blink-text="'TOUCH TO START'"
      :blink-text-size="'72px'"
      :blink-text-top="'756px'"
      :blink-text-left="'80px'"
      :float="'right'"
      :clickable="true"
      :destination="'BE20'"
    />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'bedroom',
  components: {
    AppButton
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url(' + this.getImageAssetFilePath('bedroom/find-fire-hazards/stage_blurred_mono.png') + ')',
        'background-repeat': 'no-repeat',
        'background-position': -1380 + 'px 0px',
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
#bedroom-wrapper {
  height: 100%;
  background-color: #F5F5F5;
  padding: 90px 120px;
}

.left-button {
  width: 800px;
  height: 900px;
  background-color: pink;
  /*background-color: white;*/
  float: left;
}

.right-button {
  width: 800px;
  height: 900px;
  background-color: #21135F;
  float: right;
  border-radius: 30px;
  padding: 70px 60px 30px 74px;
}

.text-top {
  color: #FEFEFE;
  font-family: 'Century Gothic Bold';
  font-size: 72px;
  letter-spacing: .1px;
  line-height: 72px;

}

.divider-top {
  background-color: #E31D1A;
  margin: 35px 6px 0 6px;
  height: 25px;
  width: 100%;
}

.title {
  margin: 30px 0 0 9px;
  color: #FFCE00;
  font-family: 'Berthold City Bold';
  font-size: 170px;
  letter-spacing: .1px;
  line-height: 150px;
}

.divider-bottom {
  background-color: #E31D1A;
  margin: 18px 6px 0 6px;
  height: 25px;
  width: 100%;
}

.touch-to-start {
  margin: 28px 0 0 9px;
  color: #FEFEFE;
  font-family: 'Century Gothic Bold';
  font-size: 72px;
  letter-spacing: .1px;
  line-height: 72px;
}
</style>
