<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="button-wrapper"
    :style="getBGColorStyle"
    @mousedown="changeColor"
    @mouseup="changeColor"
    @mouseleave="resetClick">
    <div class="button-container">
      <slot name="left-button-content"></slot>
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'footer-button',
  data () {
    return {
      clicked: false
    }
  },
  computed: {
    getBGColorStyle () {
      if (this.clicked) {
        return {'background-color': 'white'}
      } else {
        return {'background-color': '#AAA9AA'}
      }
    }
  },
  methods: {
    changeColor () {
      this.clicked = !this.clicked
    },
    resetClick () {
      this.clicked = false
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.button-wrapper {
  width: 100%;
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
