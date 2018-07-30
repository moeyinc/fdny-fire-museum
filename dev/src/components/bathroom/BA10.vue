<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="bathroom-fire-hazards-wrapper">
    <content-header :bgColor="'#DA291C'" :height="150" :padding-right="300">
      <h1 slot="content-title"><span class="white">HOW MANY FIRE HAZARDS CAN YOU FIND </span><span class="yellow">IN THE BATHROOM?</span></h1>
    </content-header>
    <remainder-circle :remainder="getNumberOfRemainingHazards"/>
    <main role="main">
      <find-hazards-stage
        :stage-image-path="'bathroom/find-fire-hazards/stage_zoomed.png'"
        :initial-stage-pos="-1152"
        :hazard-settings="hazardSettings"
        :hazards="hazards"
        :stage-width="1080"
        :stage-height="1670"
        :screen-height="1920"
        @update-position="updatePosition"
        @found-hazard="foundHazard"
      />
    </main>
    <content-footer
      :bgColor="'#DA291C'"
      :bgColorActive="'#FFCE00'"
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
        <check-circle-icon class="check-circle-icon" />
        <p>
          SHOW ANSWERS
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
import CheckCircleIcon from 'vue-material-design-icons/check-circle.vue'
import RemainderCircle from '@/components/find-hazards/RemainderCircle.vue'
import FindHazardsStage from '@/components/find-hazards/FindHazardsStage.vue'

export default {
  name: 'BA10',
  components: {
    ContentHeader,
    ContentFooter,
    ArrowLeftThickIcon,
    CheckCircleIcon,
    RemainderCircle,
    FindHazardsStage
  },
  data () {
    return {
      hazardSettings: {
        dotRadius: 25,
        dotColor: '#FFCE00',
        hasBalloonTitle: true,
        hasBalloonImage: true,
        baseBoxWidth: 1000
      },
      hazards: [
        {
          dot: {
            initialPos: {x: 1330, y: 1160},
            currentPos: {x: 1330, y: 1160},
            discovered: false
          },
          balloon: {
            title: 'Electronic Devices',
            description: 'Electronic devices like hair dryers and curling irons can cause a fire if they get near water. <br /><br />Do not use devices in the bathtub, shower, or when the sink is full of water.',
            imagePath: 'bathroom/find-fire-hazards/dryer.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1198, y: 1510},
            currentPos: {x: 1198, y: 1510},
            discovered: false
          },
          balloon: {
            title: 'Electronic Device left in Outlet',
            description: 'Electronic devices like hair dryers, curling irons, and electric razors can start a fire if they are left plugged in too long. <br /><br />Unplug all devices when you are finished with them.',
            imagePath: 'bathroom/find-fire-hazards/outlet.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1560, y: 900},
            currentPos: {x: 1560, y: 900},
            discovered: false
          },
          balloon: {
            title: 'Candles',
            description: 'Candles can be a fire hazard. Never use candles near curtains, towels or other fabric. Never leave a candle lit when no one is in the room.',
            imagePath: 'bathroom/find-fire-hazards/candle.png'
          }
        }
      ]
    }
  },
  computed: {
    getNumberOfRemainingHazards () {
      let count = 0
      for (let i = 0; i < this.hazards.length; i++) {
        if (this.hazards[i].dot.discovered === false) {
          count++
        }
      }
      return count
    }
  },
  methods: {
    // update positions of all hazards
    updatePosition (newPos) {
      for (let i = 0; i < this.hazards.length; i++) {
        this.hazards[i].dot.currentPos.x = this.hazards[i].dot.initialPos.x + newPos
      }
    },
    foundHazard (index) {
      this.hazards[index].dot.discovered = true
    },
    footerLeftClicked () {
      this.$router.push({ name: 'bathroom' })
    },
    footerRightClicked () {
      // discover all the hazards
      for (let i = 0; i < this.hazards.length; i++) {
        this.hazards[i].dot.discovered = true
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#bathroom-fire-hazards-wrapper {
  position: relative;
  height: 100%;
}

.arrow-left-thick-icon {
  left: 145px;
}

.check-circle-icon {
  left: 20px;
}

main {
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
  height: 1670px;
  overflow: hidden;
  background-color: #F5F5F5;
}
</style>
