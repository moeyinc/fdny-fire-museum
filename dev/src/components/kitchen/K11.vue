<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="fire-extinguisher-wrapper">
    <content-header :bgColor="'#24135F'">
      <h1 slot="content-title"><span class="white">HOW TO USE </span><span class="red">FIRE SAFETY TOOLS</span></h1>
    </content-header>

    <main role="main">
      <div class="top-text">
        <h2>Fire Extinguisher</h2>
        <p>
          Fire extinguishers are helpful for quick use on small fires.<br />
          Make sure your extinguisher is always ready to use. There should be nothing blocking the extinguisher. All hoses and nozzles should be clean and not damaged. Follow your extinguisher's instructions for maintenance.
        </p>
      </div>
      <div class="bottom-images">
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/pull_the_pin.png'"
            :text="'PULL THE PIN'"
            :width="'400px'"
            :height="'400px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/aim_at_fire.png'"
            :text="'AIM AT THE BASE OF FIRE'"
            :width="'400px'"
            :height="'400px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/squeeze_the_lever.png'"
            :text="'SQUEEZE THE LEVER'"
            :width="'400px'"
            :height="'400px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="false"
            :custom-elev="0"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'kitchen/fire-safety-tools/sweep_side_to_side.png'"
            :text="'SWEEP SIDE TO SIDE'"
            :width="'400px'"
            :height="'400px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'280px'"
            :text-height="'100px'"
            :font-size="'36px'"
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
  name: 'K11',
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
#fire-extinguisher-wrapper {
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
  height: 45%;
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
  height: 55%;
  text-align: center;
}

.image-card-container {
  display: inline-block;
  margin: 0 10px;

}
</style>
