<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="smoke-detector-wrapper">
    <content-header :bgColor="'#24135F'">
      <h1 slot="content-title"><span class="white">HOW TO USE </span><span class="red">FIRE SAFETY TOOLS</span></h1>
    </content-header>

    <main role="main">
      <div class="top-text">
        <h2>Smoke Detector</h2>
        <p>
          Smoke and Carbon Monoxide (CO) detectors and alarms save lives. They keep you safe, even when you sleep!
        </p>
      </div>
      <div class="bottom-images">
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/detector_near_bed.png'"
            :text="'For a safe home, have detectors near where you sleep. Make sure your friends and family have them in their homes.'"
            :width="'550px'"
            :height="'500px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'200px'"
            :font-size="'28px'"
            :text-align="'left'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/test_detector.png'"
            :text="'Test detectors regularly to make sure they\'re working.'"
            :width="'500px'"
            :height="'500px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'200px'"
            :font-size="'28px'"
            :text-align="'left'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/change_batteries.png'"
            :text="'Change the batteries in your detectors twice a year, when you change your clocks.'"
            :width="'500px'"
            :height="'500px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'200px'"
            :font-size="'28px'"
            :text-align="'left'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
      </div>
    </main>

    <content-footer
      :bgColor="'#24135F'"
      :bgColorActive="'#FFCE00'"
      :has-left-button="true"
      :has-right-button="false"
      @left-clicked="footerLeftClicked">
      <div slot="left-button-content">
        <arrow-left-thick-icon class="arrow-left-thick-icon" />
        <p>
          BACK
        </p>
      </div>
    </content-footer>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import ContentHeader from '@/components/ContentHeader.vue'
import ContentFooter from '@/components/ContentFooter.vue'
import ImageCard     from '@/components/ImageCard.vue'
import ArrowLeftThickIcon from 'vue-material-design-icons/arrow-left-thick.vue'

export default {
  name: 'K12',
  components: {
    'content-header': ContentHeader,
    'content-footer': ContentFooter,
    'image-card'  : ImageCard,
    'arrow-left-thick-icon': ArrowLeftThickIcon
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'K10' })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#smoke-detector-wrapper {
  position: relative;
  height: 100%;
}

.arrow-left-thick-icon {
  left: 145px;
}

main {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 880px;
  overflow: hidden;
  padding: 40px 60px;
  background-color: #F5F5F5;
}

.top-text {
  width: 100%;
  height: 35%;
}

.top-text h2 {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #DA291C;
}

.top-text p {
  font-size: 42px;
}

.bottom-images {
  width: 100%;
  height: 65%;
  text-align: center;
}

.image-card-container {
  display: inline-block;
  margin: 0 10px;

}
</style>
