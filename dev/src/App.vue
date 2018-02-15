<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="app" :style="getSize">
    <router-view></router-view>
  </div>
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
      monitorHeight: 1080
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
</style>
