<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="swipe-indicator blinking" :style="getPos">
    <gesture-swipe-right-icon v-if="left"/>
    <gesture-swipe-left-icon v-if="right"/>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import GestureSwipeLeftIcon from 'vue-material-design-icons/gesture-swipe-left.vue'
import GestureSwipeRightIcon from 'vue-material-design-icons/gesture-swipe-right.vue'

export default {
  name: 'SwipeIndicator',
  props: {
    left: Boolean,
    right: Boolean,
    screenHeight: Number
  },
  components: {
    GestureSwipeLeftIcon,
    GestureSwipeRightIcon
  },
  computed: {
    getPos () {
      if (this.left) {
        return {
          left: 0,
          top: (this.screenHeight / 2) + 'px'
        }
      } else if (this.right) {
        return {
          right: 96 + 'px',
          top: (this.screenHeight / 2) + 'px'
        }
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.swipe-indicator {
  font-size: 96px;
  color: #FFCE00;
  position: fixed;
  z-index: 2000;
}

@-webkit-keyframes pulse {
 from {
   opacity: 1.0;
 }
 to {
   opacity: 0;
 }
}

.blinking {
  -webkit-animation-name: pulse;
  -webkit-animation-duration: 0.8s;
  -webkit-animation-iteration-count:infinite;
  -webkit-animation-timing-function:ease-in-out;
  -webkit-animation-direction: alternate;
  -webkit-animation-delay: 0s;
}
</style>
