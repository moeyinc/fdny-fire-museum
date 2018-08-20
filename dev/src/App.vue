<!-- =================================================
 Vue Template
================================================== -->
<template>
  <v-touch
    id="app"
    :style="getSize"
    @tap="resetTimer()">
    <router-view></router-view>
  </v-touch>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
require('@/assets/css/normalize.css')
require('@/assets/css/material.css')

export default {
  name: 'app',
  data () {
    return {
      monitorWidth: 1920,
      monitorHeight: 1080,
      screenTimer: null
    }
  },
  watch: {
    $route () {
      // for the monitor in the bathroom with different size
      this.setMonitorSize()

      // resize the screen
      this.resize()
    }
  },
  created () {
    this.resetTimer()
  },
  mounted () {
    // for the monitor in the bathroom with different size
    this.setMonitorSize()

    // resize the screen
    this.resize()

    // set an event listener for resizing
    window.addEventListener('resize', this.resize)
  },
  computed: {
    getSize () {
      return {
        width: this.monitorWidth + 'px',
        height: this.monitorHeight + 'px'
      }
    }
  },
  methods: {
    setMonitorSize () {
      // bathroom's monitor is different from others
      const rootPath = this.$route.path.substring(1, 9)
      if (rootPath === 'bathroom') {
        this.monitorWidth  = 1080
        this.monitorHeight = 1920
      } else {
        this.monitorWidth  = 1920
        this.monitorHeight = 1080
      }
    },
    resize () {
      // calc how much the content should be zoomed
      let zoom

      let ratioW = window.innerWidth / this.monitorWidth
      let ratioH = window.innerHeight / this.monitorHeight
      ratioW < ratioH ? zoom = ratioW : zoom = ratioH

      // zoom it
      const el = document.getElementById('app')
      el.style.zoom = zoom
      // el.style.zoom = 1.0
    },
    resetTimer () {
      console.log('resetting timer')
      clearTimeout(this.screenTimer)
      const timeout = 2 * 60 * 1000
      this.screenTimer = setTimeout(this.goHomeScreen, timeout)
    },
    goHomeScreen () {
      // get your destination
      let destination = ''
      if (this.$route.path.includes('kitchen')) {
        destination = 'kitchen'
      } else if (this.$route.path.includes('bathroom')) {
        destination = 'bathroom'
      } else if (this.$route.path.includes('living-room')) {
        destination = 'living-room'
      } else if (this.$route.path.includes('bedroom')) {
        destination = 'bedroom'
      }

      // redirect
      this.$router.push({ name: destination })
    }
  },
  beforeDestroy () {
    // remove the event listener
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style>
/*-------- for touch screens --------*/
html {
  /*cursor: none;*/
  user-select: none;
}

a {
  /*cursor: none;*/
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/*-------- fonts --------*/
@font-face {
  font-family: "News Gothic MT Bold";
  src: url("assets/fonts/NWGTHCB.ttf");
}

@font-face {
  font-family: "Century Gothic Bold";
  src: url("assets/fonts/CenturyGothicBold.ttf");
}

@font-face {
  font-family: "Berthold City Bold";
  src: url("assets/fonts/BertholdCityBold.otf");
}

/*-------- common styles --------*/
body {
  background-color: white;
}

span.blue {
  color: #24135F;
}

span.red {
  color: #DA291C;
}

span.yellow {
  color: #FFCE00;
}

span.white {
  color: #FFFFFF;
}

#app {
  letter-spacing: 1px;
  font-family: "News Gothic MT Bold";
  background-color: white;
  color: #24135F;
  /*width: 1920px;
  height: 1080px;*/
  overflow: hidden;
}

#gesture-swipe-left-icon svg {
  filter: drop-shadow( 5px 2px 2px rgba(0, 0, 0, 0.2));
}
#gesture-swipe-right-icon svg {
  filter: drop-shadow( 5px 2px 2px rgba(0, 0, 0, 0.2));
}

/* .material-design-icon {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
} */

.material-design-icon {
  display: inline-flex;
  align-self: center;
  position: absolute;
  height: 1em;
  width: 1em;
  top: 50%;
  transform: translateY(-50%);
}

.material-design-icon > .material-design-icon__svg {
  height: 1em;
  width: 1em;
  fill: currentColor;
  position: absolute;
  /* bottom: -0.125em; */
}
</style>
