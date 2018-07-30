<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="bedroom-fire-hazards-wrapper">
    <content-header :bgColor="'#DA291C'">
      <h1 slot="content-title"><span class="white">HOW MANY FIRE HAZARDS CAN YOU FIND </span><span class="yellow">IN THE BEDROOM?</span></h1>
    </content-header>
    <remainder-circle :remainder="getNumberOfRemainingHazards"/>
    <main role="main">
      <find-hazards-stage
        :stage-image-path="'bedroom/find-fire-hazards/stage.png'"
        :initial-stage-pos="-1159"
        :hazard-settings="hazardSettings"
        :hazards="hazards"
        :stage-width="1920"
        :stage-height="880"
        :screen-height="1080"
        :close-balloon-trigger="0"
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
  name: 'K20',
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
            initialPos: {x: 1967, y: 712},
            currentPos: {x: 1967, y: 712},
            discovered: false
          },
          balloon: {
            title: 'Space Heater near Curtain',
            description: 'Space heaters can get very hot and can burn. Curtains, blankets, towels, clothes, and other fabric can be fire hazards near space heaters. Never leave anything near a space heater. <br /><br />Never leave space heaters turned on when no one is in the room.',
            imagePath: 'bedroom/find-fire-hazards/heater.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1807, y: 790},
            currentPos: {x: 1807, y: 790},
            discovered: false
          },
          balloon: {
            title: 'Overloaded Outlet',
            description: 'Outlets with too many plugs and power strips can start electrical fires. <br /><br />Never use more than one power strip per outlet, and check cords and plugs for damage. Repair or replace damaged items.',
            imagePath: 'bedroom/find-fire-hazards/outlet.png'
          }
        },
        {
          dot: {
            initialPos: {x: 2043, y: 415},
            currentPos: {x: 2043, y: 415},
            discovered: false
          },
          balloon: {
            title: 'Lamp near Curtains',
            description: 'Light bulbs can get very hot and burn. Keep lamps away from curtains and other fabric.',
            imagePath: 'bedroom/find-fire-hazards/lamp.png'
          }
        },
        {
          dot: {
            initialPos: {x: 2435, y: 705},
            currentPos: {x: 2435, y: 705},
            discovered: false
          },
          balloon: {
            title: 'Towel on Radiator',
            description: 'Radiators can get very hot and can burn. Towels, blankets, clothes, and other fabric can be a fire hazard when left on or near radiators. <br />Never place anything on top of a radiator.',
            imagePath: 'bedroom/find-fire-hazards/radiator_towel.png'
          }
        },
        {
          dot: {
            initialPos: {x: 3303, y: 775},
            currentPos: {x: 3303, y: 775},
            discovered: false
          },
          balloon: {
            title: 'Trash Can',
            description: 'Trash cans near heat or electricity sources can catch fire. Place trash cans away from outlets, stoves, and ovens. Don’t put things like cooking oil, paint, or gasoline in the trash. Follow your city’s instructions for throwing away these items.',
            imagePath: 'bedroom/find-fire-hazards/trashcan.png'
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
      this.$router.push({ name: 'bedroom' })
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
#bedroom-fire-hazards-wrapper {
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
