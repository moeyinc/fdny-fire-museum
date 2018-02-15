<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="escape-plan-wrapper">
    <content-header :bgColor="'#FFCE00'">
      <h1 slot="content-title"><span class="white">MY FAMILY </span><span class="red">FIRE ESCAPE PLAN</span></h1>
    </content-header>

    <main role="main">
      <div class="top-block" :style="getTopBlockSize">
        <h2>5. Practice your family escape plan.</h2>
        <p>
          Hold fire drills with everyone who lives in your home. Assign an adult to wake children and older adults in case of an emergency. Practice crawling to each exit and meeting at your family’s  safe place.
        </p>
      </div>
      <div class="bottom-block" :style="getBottomBlockSize">
        <div class="left-sketchpad" id="sketchpad-container" :style="getLeftSketchpadSize">
          <sketchpad
            :width="mainWidth * leftSketchpadWidth"
            :height="mainHeight * bottomBlockHeight"
            :pause="true"/>
        </div>
        <div class="right-sample" :style="getRightSampleSize">
          <div class="image-card-container">
            <div class="balloon">
              <p>
                This is your <br />family escape plan! <br />
                <br />
                Take a picture of your map and practice it at home!
              </p>
            </div>
          </div>
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
        <p>
          DONE
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
import Sketchpad     from '@/components/sketchpad/Sketchpad.vue'
import ImageCard     from '@/components/ImageCard.vue'
import ArrowLeftThickIcon from 'vue-material-design-icons/arrow-left-thick.vue'
import ArrowRightThickIcon from 'vue-material-design-icons/arrow-right-thick.vue'

export default {
  name: 'L15',
  components: {
    ContentHeader,
    ContentFooter,
    Sketchpad,
    ImageCard,
    ArrowLeftThickIcon,
    ArrowRightThickIcon
  },
  data () {
    return {
      mainHeight: 800,
      mainWidth: 1800,
      topBlockHeight: 0.3,
      bottomBlockHeight: 0.7,
      leftSketchpadWidth: 0.7,
      rightSampleWidth: 0.3
    }
  },
  computed: {
    getTopBlockSize () {
      return {
        'width' : this.mainWidth,
        'height': this.mainHeight * this.topBlockHeight + 'px'
      }
    },
    getBottomBlockSize () {
      return {
        'width' : this.mainWidth,
        'height': this.mainHeight * this.bottomBlockHeight + 'px'
      }
    },
    getLeftSketchpadSize () {
      return {
        'width' : this.mainWidth * this.leftSketchpadWidth + 'px',
        'height': this.mainHeight * this.bottomBlockHeight + 'px'
      }
    },
    getRightSampleSize () {
      return {
        'width' : this.mainWidth * this.rightSampleWidth + 'px',
        'height': this.mainHeight * this.bottomBlockHeight + 'px'
      }
    }
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'L14' })
    },
    footerRightClicked () {
      this.$router.push({ name: 'living-room' })
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

.top-block h2 {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #DA291C;
}

.top-block p {
  font-size: 36px;
}

.left-sketchpad {
  float: left;
}

.right-sample {
  float: right;
  padding-top: 120px;
}

.right-sample p {
  color: white;
  font-size: 36px;
}

.image-card-container {
  display: inline-block;
  margin: 0 40px 0 60px;
}

.balloon {
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: #DA291C;
  border-radius: 20px;
}

</style>
