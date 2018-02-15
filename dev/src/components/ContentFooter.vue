<!-- =================================================
 Vue Template
================================================== -->
<template>
  <footer id="content-footer-wrapper" :style="{'background-color': bgColor}">
    <div
      class="left-button"
      :style="getLeftButtonBGColor"
      v-if="hasLeftButton"
      @mousedown="changeLeftColor"
      @mouseup="changeLeftColor"
      @mouseleave="resetLeftClick"
      @click="$emit('left-clicked')">
      <div class="button-container">
        <slot name="left-button-content"></slot>
      </div>
    </div>
    <div
      class="right-button"
      :style="getRightButtonBGColor"
      v-if="hasRightButton"
      @mousedown="changeRightColor"
      @mouseup="changeRightColor"
      @mouseleave="resetRightClick"
      @click="$emit('right-clicked')"
      >
      <div class="button-container">
        <slot name="right-button-content"></slot>
      </div>
    </div>
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
