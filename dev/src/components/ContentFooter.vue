<!-- =================================================
 Vue Template
================================================== -->
<template>
  <footer id="content-footer-wrapper" :style="{'background-color': bgColor}">
    <v-touch
      class="left-button"
      :style="getLeftButtonBGColor"
      v-if="hasLeftButton"
      @touchstart.native="changeLeftColor"
      @touchend.native="changeLeftColor"
      @touchcancel.native="resetLeftClick"
      @tap="$emit('left-clicked')">
      <div class="button-container">
        <slot name="left-button-content"></slot>
      </div>
    </v-touch>
    <v-touch
      class="right-button"
      :style="getRightButtonBGColor"
      v-if="hasRightButton"
      @touchstart.native="changeRightColor"
      @touchend.native="changeRightColor"
      @touchcancel.native="resetRightClick"
      @tap="$emit('right-clicked')"
      >
      <div class="button-container">
        <slot name="right-button-content"></slot>
      </div>
    </v-touch>
  </footer>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'content-footer',
  mixins: [MixinMaterials],
  props: {
    bgColor: String,
    bgColorActive: String,
    hasLeftButton: Boolean,
    hasRightButton: Boolean
  },
  data () {
    return {
      elev: 8,
      leftButtonClicked: false,
      rightButtonClicked: false
    }
  },
  computed: {
    getLeftButtonBGColor () {
      if (this.leftButtonClicked) {
        return {'background-color': this.bgColorActive}
      } else {
        return {'background-color': this.bgColor}
      }
    },
    getRightButtonBGColor () {
      if (this.rightButtonClicked) {
        return {'background-color': this.bgColorActive}
      } else {
        return {'background-color': this.bgColor}
      }
    }
  },
  methods: {
    changeLeftColor () {
      this.leftButtonClicked = !this.leftButtonClicked
    },
    changeRightColor () {
      this.rightButtonClicked = !this.rightButtonClicked
    },
    resetLeftClick () {
      this.leftButtonClicked = false
    },
    resetRightClick () {
      this.rightButtonClicked = false
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#content-footer-wrapper {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100px;
  color: white;
  font-size: 42px;
}

.left-button {
  float: left;
  position: relative;
  width: 500px;
  height: 100%;
}

.right-button {
  float: right;
  position: relative;
  width: 500px;
  height: 100%;
}

.button-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  padding: 0 40px;
  text-align: center;
}

</style>
