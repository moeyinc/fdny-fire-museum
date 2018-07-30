<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="living-room-fire-hazards-wrapper">
    <content-header :bgColor="'#DA291C'">
      <h1 slot="content-title"><span class="white">HOW MANY FIRE HAZARDS CAN YOU FIND </span><span class="yellow">IN THE LIVING ROOM?</span></h1>
    </content-header>
    <remainder-circle :remainder="getNumberOfRemainingHazards"/>
    <main role="main">
      <find-hazards-stage
        :stage-image-path="'living-room/find-fire-hazards/stage.png'"
        :initial-stage-pos="-1154"
        :hazard-settings="hazardSettings"
        :hazards="hazards"
        :stage-width="1920"
        :stage-height="880"
        :screen-height="1080"
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
  name: 'L20',
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
            initialPos: {x: 2325, y: 425},
            currentPos: {x: 2325, y: 425},
            discovered: false
          },
          balloon: {
            title: 'Candles',
            description: 'Candles can be a fire hazard. <br />Never use candles near flowers or soft furniture, blankets, curtains, or other fabric. <br />Never leave a candle lit when no one is in the room.',
            imagePath: 'living-room/find-fire-hazards/candle_wall.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1825, y: 695},
            currentPos: {x: 1825, y: 695},
            discovered: false
          },
          balloon: {
            title: 'Candles',
            description: 'Candles can be a fire hazard. <br />Never use candles near wood furniture or books, magazines, and papers. <br />Never leave a candle lit when no one is in the room.',
            imagePath: 'living-room/find-fire-hazards/candle_table.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1425, y: 695},
            currentPos: {x: 1425, y: 695},
            discovered: false
          },
          balloon: {
            title: 'Towel on Radiator',
            description: 'Radiators can get very hot and can burn. Towels, blankets, clothes, and other fabric can be a fire hazard when left on or near radiators. Never place anything on top of a radiator.',
            imagePath: 'living-room/find-fire-hazards/towel_radiator.png'
          }
        },
        {
          dot: {
            initialPos: {x: 475, y: 375},
            currentPos: {x: 475, y: 375},
            discovered: false
          },
          balloon: {
            title: 'Lamp near Curtains',
            description: 'Light bulbs can get very hot and burn. Keep lamps away from curtains and other fabric.',
            imagePath: 'living-room/find-fire-hazards/lamp.png'
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
      this.$router.push({ name: 'living-room' })
    },
    footerRightClicked () {
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
#living-room-fire-hazards-wrapper {
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
  top: 100px;
  left: 0;
  width: 100%;
  height: 880px;
  overflow: hidden;
  background-color: #F5F5F5;
}
</style>
