<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="kitchen-fire-hazards-wrapper">
    <content-header :bgColor="'#DA291C'">
      <h1 slot="content-title"><span class="white">HOW MANY FIRE HAZARDS CAN YOU FIND </span><span class="yellow">IN THE KITCHEN?</span></h1>
    </content-header>
    <remainder-circle :remainder="getNumberOfRemainingHazards"/>
    <main role="main">
      <find-hazards-stage
        :stage-image-path="'kitchen/find-fire-hazards/stage.png'"
        :initial-stage-pos="0"
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
            initialPos: {x: 132, y: 555},
            currentPos: {x: 132, y: 555},
            discovered: false
          },
          balloon: {
            title: 'Metal in Microwave',
            description: 'Never use aluminum foil or metal objects in the microwave. They can cause a fire. <br /><br />Only use microwave safe containers and dishes.',
            imagePath: 'kitchen/find-fire-hazards/microwave.png'
          }
        },
        {
          dot: {
            initialPos: {x: 212, y: 665},
            currentPos: {x: 212, y: 665},
            discovered: false
          },
          balloon: {
            title: 'Lighters and Matches',
            description: 'Only grown-ups should use lighters, matches and firecrackers.<br /><br />If you find any of these, give them to a grown-up, so they can be stored out of sight and reach, preferably in a locked cabinet or drawer.',
            imagePath: 'kitchen/find-fire-hazards/lighter.png'
          }
        },
        {
          dot: {
            initialPos: {x: 212, y: 720},
            currentPos: {x: 212, y: 720},
            discovered: false
          },
          balloon: {
            title: 'Cigarettes and Candles',
            description: 'Cigarettes and candles can be fire hazards. <br /><br />If you must smoke inside, use deep sturdy ashtrays. Extinguish all cigarette butts in water or sand. Never leave a cigarette or candle lit when no one is in the room.',
            imagePath: 'kitchen/find-fire-hazards/candle.png'
          }
        },
        {
          dot: {
            initialPos: {x: 675, y: 575},
            currentPos: {x: 675, y: 575},
            discovered: false
          },
          balloon: {
            title: 'Curtain near Stove Burners',
            description: 'Curtains, towels, or oven mitts near stove burners can start a fire. <br /><br />Keep the stove top clear of anything flammable, like fabric or paper.',
            imagePath: 'kitchen/find-fire-hazards/curtain.png'
          }
        },
        {
          dot: {
            initialPos: {x: 795, y: 595},
            currentPos: {x: 795, y: 595},
            discovered: false
          },
          balloon: {
            title: 'Stove Burners',
            description: 'Stove burners get very hot and can burn. <br />A burner doesn’t always glow red when it’s hot. Always be careful around burners. <br /><br />Turn pot handles in so they are less likely to be knocked off. Wear short sleeves or close fitting sleeves when cooking. Never leave cooking unattended.',
            imagePath: 'kitchen/find-fire-hazards/stove.png'
          }
        },
        {
          dot: {
            initialPos: {x: 735, y: 725},
            currentPos: {x: 735, y: 725},
            discovered: false
          },
          balloon: {
            title: 'Towel near Oven',
            description: 'Towels or oven mitts can start a fire if they are in or near the oven. <br /><br />Keep the oven clear of anything flammable, like fabric or paper.',
            imagePath: 'kitchen/find-fire-hazards/towel.png'
          }
        },
        {
          dot: {
            initialPos: {x: 805, y: 778},
            currentPos: {x: 805, y: 778},
            discovered: false
          },
          balloon: {
            title: 'Unattended Oven',
            description: 'Ovens can get very hot and can burn. Always be careful around the oven. <br /><br />Wear short sleeves or close fitting sleeves when cooking. Never leave cooking unattended.',
            imagePath: 'kitchen/find-fire-hazards/oven.png'
          }
        },
        {
          dot: {
            initialPos: {x: 1500, y: 775},
            currentPos: {x: 1500, y: 775},
            discovered: false
          },
          balloon: {
            title: 'Trash Can',
            description: 'Trash cans near heat or electricity sources can catch fire. Place trash cans away from outlets, stoves, and ovens. <br /><br />Don’t put things like cooking oil, paint, and gasoline in the trash. Follow your city’s instructions for throwing away these items.',
            imagePath: 'kitchen/find-fire-hazards/trashcan.png'
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
      this.$router.push({ name: 'kitchen' })
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
#kitchen-fire-hazards-wrapper {
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
