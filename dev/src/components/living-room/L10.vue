<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="escape-plan-wrapper">
    <content-header :bgColor="'#FFCE00'">
      <h1 slot="content-title"><span class="white">MY FAMILY </span><span class="red">FIRE ESCAPE PLAN</span></h1>
    </content-header>

    <main role="main">
      <div class="left-text">
        <h2>Make Your Escape Plan</h2>
        <p>
          Every home should have a plan in case of a fire so you can get out safely.<br />
          Follow these steps to make your family escape plan.
        </p>
      </div>
      <div class="right-image">
        <div class="image-container">
          <img id="planning-image" />
        </div>
      </div>
    </main>

    <content-footer
      :bgColor="'#FFCE00'"
      :bgColorActive="'#DA291C'"
      :has-left-button="true"
      :has-right-button="true"
      @left-clicked="footerLeftClicked"
      @right-clicked="footerRightClicked"
      >
      <div slot="left-button-content">
        <arrow-left-thick-icon class="arrow-left-thick-icon" />
        <p>
          BACK
        </p>
      </div>
      <div slot="right-button-content">
        <arrow-right-thick-icon class="arrow-right-thick-icon" />
        <p>
          NEXT
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
import ArrowLeftThickIcon from 'vue-material-design-icons/arrow-left-thick.vue'
import ArrowRightThickIcon from 'vue-material-design-icons/arrow-right-thick.vue'

export default {
  name: 'L10',
  components: {
    ContentHeader,
    ContentFooter,
    ArrowLeftThickIcon,
    ArrowRightThickIcon
  },
  data () {
    return {
      planningImages: [
        'living-room/fire-escape-plan/planning_man_white.png',
        'living-room/fire-escape-plan/planning_man_asian.png',
        'living-room/fire-escape-plan/planning_man_latin.png',
        'living-room/fire-escape-plan/planning_man_african.png'
      ]
    }
  },
  mounted () {
    // randomly pick and set an image
    this.setRandomImage(document.getElementById('planning-image'), this.planningImages)
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'living-room' })
    },
    footerRightClicked () {
      this.$router.push({ name: 'L11' })
    },
    setRandomImage (el, images) {
      let val = Math.random(1.0)
      let unit = 1.0 / images.length
      let path
      for (let i = 0; i < images.length; i++) {
        let min = unit * i
        let max = unit * (i + 1)
        if (val >= min  && val <= max) {
          path = images[i]
        }
      }

      el.src = this.getImageAssetFilePath(path)
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#escape-plan-wrapper {
  position: relative;
  height: 100%;
}

.arrow-left-thick-icon {
  left: 145px;
}

.arrow-right-thick-icon {
  left: 315px;
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

.left-text {
  width: 50%;
  height: 100%;
  float: left;
}

.left-text h2 {
  font-size: 54px;
  font-weight: bold;
  margin-top: 150px;
  margin-bottom: 50px;
  color: #DA291C;
}

.left-text p {
  font-size: 42px;
}

.right-image {
  width: 50%;
  height: 100%;
  display: table;
  float: left;
}

.image-container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  margin: 0 40px;
}

img#planning-image {
  display: inline-block;
  width: 800px;
  height: auto;
}

</style>
