<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="stay-low-and-go-wrapper">
    <content-header :bgColor="'#DA291C'">
      <h1 slot="content-title"><span class="white">HOW TO </span><span class="yellow">STAY LOW AND GO</span></h1>
    </content-header>
    <main role="main" :style="getBGImage" @click="closeBalloonIfAny($event)">
      <div class="top-text">
        <p>
          When you see smoke and fire, stay low and go. Tap the screen to learn more!
        </p>
      </div>
      <div class="smoke" :style="getSmokeImage">
      </div>
      <div class="people">
        <img id="wheelchair" />
        <img id="kid" />
        <img id="adult" />
      </div>
      <hazard
        v-for="(hazard, index) in hazards"
        :hazard-settings="hazardSettings"
        :dot="hazard.dot"
        :balloon="hazard.balloon"
        :stage-width="1920"
        :stage-height="880"
        :key="index"
        :id="index"
        :is-active-balloon="isActiveBalloon(index)"
        @open-balloon="openBalloon"
        @close-balloon="closeBalloon"
      />
    </main>
    <content-footer
      :bgColor="'#DA291C'"
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
import ArrowLeftThickIcon from 'vue-material-design-icons/arrow-left-thick.vue'
import Hazard from '@/components/find-hazards/Hazard'

export default {
  name: 'app',
  components: {
    ContentHeader,
    ContentFooter,
    ArrowLeftThickIcon,
    Hazard
  },
  data () {
    return {
      smokePos: 0,
      wheelchairImages: [
        'bedroom/stay-low-and-go/wheelchair_1.png',
        'bedroom/stay-low-and-go/wheelchair_2.png',
        'bedroom/stay-low-and-go/wheelchair_3.png',
        'bedroom/stay-low-and-go/wheelchair_4.png'
      ],
      kidImages: [
        'bedroom/stay-low-and-go/kid_1.png',
        'bedroom/stay-low-and-go/kid_2.png',
        'bedroom/stay-low-and-go/kid_3.png',
        'bedroom/stay-low-and-go/kid_4.png'
      ],
      adultImages: [
        'bedroom/stay-low-and-go/adult_1.png',
        'bedroom/stay-low-and-go/adult_2.png',
        'bedroom/stay-low-and-go/adult_3.png',
        'bedroom/stay-low-and-go/adult_4.png'
      ],
      activeBalloon: -1,
      hazardSettings: {
        dotRadius: 25,
        dotColor: '#FFCE00',
        hasBalloonTitle: false,
        hasBalloonImage: false,
        baseBoxWidth: 700
      },
      hazards: [
        {
          dot: {
            initialPos: {x: 150, y: 350},
            currentPos: {x: 150, y: 350},
            bgColor: '#FFCE00',
            discovered: true
          },
          balloon: {
            description: 'When you see smoke or fire, or hear firefighters in your home, Don\'t Hide. Get Outside! <br /><br />Stay low and crawl to the nearest exit.'
          }
        },
        {
          dot: {
            initialPos: {x: 435, y: 625},
            currentPos: {x: 435, y: 625},
            bgColor: '#FFCE00',
            discovered: true
          },
          balloon: {
            description: 'Smoke makes it difficult to breathe. Covering your nose and mouth with a wet cloth can help. <br /><br />Remember to always stay low and go.'
          }
        },
        {
          dot: {
            initialPos: {x: 755, y: 675},
            currentPos: {x: 755, y: 675},
            bgColor: '#FFCE00',
            discovered: true
          },
          balloon: {
            description: 'When you are crawling to the exit, keep one shoulder against the wall at all times.'
          }
        },
        {
          dot: {
            initialPos: {x: 1230, y: 600},
            currentPos: {x: 1230, y: 600},
            bgColor: '#FFCE00',
            discovered: true
          },
          balloon: {
            description: 'If you catch fire, Stop, Drop, and Roll. <br /><br />Stop - do not run or walk. It will make the fire worse. <br />Drop - drop to the ground. <br />Roll - roll back and forth to put out the fire. <br /><br />Cover your face with your hands.'
          }
        },
        {
          dot: {
            initialPos: {x: 1616, y: 650},
            currentPos: {x: 1616, y: 650},
            bgColor: '#FFCE00',
            discovered: true
          },
          balloon: {
            description: 'When you reach a door, feel it with the back of your hand. If it is warm, there is fire on the other side. Leave the door closed and crawl to another exit. <br /><br />Whenever you go through a door, close it behind you. This can stop fire from spreading and save lives!'
          }
        }
      ]
    }
  },
  mounted () {
    // randomly pick and set an image
    this.setRandomImage(document.getElementById('wheelchair'), this.wheelchairImages)
    this.setRandomImage(document.getElementById('kid'), this.kidImages)
    this.setRandomImage(document.getElementById('adult'), this.adultImages)

    // set a timer to move the smoke
    setInterval(this.moveSmoke, 10)
  },
  computed: {
    getBGImage () {
      return {
        'background-image': 'url("' + this.getImageAssetFilePath('bedroom/stay-low-and-go/background.png') + '")',
        'background-repeat': 'no-repeat',
        'background-position': '-300px 0px',
        'background-size': 'auto 880px'
      }
    },
    getSmokeImage () {
      return {
        'background-image': 'url("' + this.getImageAssetFilePath('bedroom/stay-low-and-go/smoke.png') + '")',
        'background-repeat': 'repeat-x',
        'background-position': -this.smokePos + 'px 0px',
        'background-size': 'auto 400px'
      }
    }
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'bedroom' })
    },
    moveSmoke () {
      this.smokePos++
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
    },
    isActiveBalloon (index) {
      if (this.activeBalloon === index) {
        return true
      } else {
        return false
      }
    },
    openBalloon (id) {
      this.activeBalloon = id
    },
    closeBalloon () {
      this.activeBalloon = -1
    },
    closeBalloonIfAny (event) {
      if (this.activeBalloon >= 0 && !event.target.classList.contains('dot')) {
        this.closeBalloon()
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#stay-low-and-go-wrapper {
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
  background-color: #F5F5F5;
}

.top-text {
  width: 100%;
  height: 100px;
  padding: 40px 60px 0 60px;
}

.top-text p {
  font-size: 42px;
}

.smoke {
  width: 100%;
  height: 400px;
}

.people {
  width: 100%;
  height: 380px;
  position: relative;
}

img#wheelchair {
  position: absolute;
  bottom: 60px;
  left: 180px;
  height: 300px;
}

img#kid {
  position: absolute;
  bottom: 60px;
  left: 570px;
  height: 160px;
}

img#adult {
  position: absolute;
  bottom: 60px;
  left: 930px;
  height: 280px;
}

</style>
