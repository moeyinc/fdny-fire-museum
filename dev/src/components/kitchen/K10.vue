<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="fire-safety-tools-wrapper">
    <content-header :bgColor="'#24135F'">
      <h1 slot="content-title"><span class="white">HOW TO USE </span><span class="red">FIRE SAFETY TOOLS</span></h1>
    </content-header>

    <main role="main">
      <div class="top-text">
        <p>
          Fire extinguishers and smoke detectors are important tools for keeping you safe. Learn more about how to use them!
        </p>
      </div>
      <div class="bottom-images">
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/fire_extinguisher.png'"
            :text="'Fire Extinguisher'"
            :width="'500px'"
            :height="'500px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'380px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'K11'"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/smoke_detector.png'"
            :text="'Smoke Detector'"
            :width="'500px'"
            :height="'500px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'380px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'K12'"
          />
        </div>
      </div>
    </main>

    <content-footer
      :bgColor="'#24135F'"
      :bgColorActive="'#FFCE00'"
      :has-left-button="true"
      :has-right-button="false"
      @left-clicked="footerLeftClicked"
      >
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
  name: 'K10',
  components: {
    ContentHeader,
    ContentFooter,
    ImageCard,
    ArrowLeftThickIcon
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'kitchen' })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#fire-safety-tools-wrapper {
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
  height: 30%;
}

.top-text p {
  font-size: 42px;
}

.bottom-images {
  width: 100%;
  height: 70%;
  text-align: center;
}

.image-card-container {
  display: inline-block;
  margin: 0 40px;

}

</style>
