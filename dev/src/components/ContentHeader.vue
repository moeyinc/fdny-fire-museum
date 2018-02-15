<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header id="content-header-wrapper" :style="getWrapperStyle">
    <div class="container" :style="getContainerStyle">
      <slot name="content-title"></slot>
    </div>
  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'content-header',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 4
    }
  },
  props: {
    bgColor: String,
    height: {
      default: 100,
      type: Number
    },
    paddingRight: {
      default: 0,
      type: Number
    }
  },
  computed: {
    getWrapperStyle () {
      return {
        'background-color': this.bgColor,
        'height': this.height + 'px'
      }
    },
    getContainerStyle () {
      return {
        'padding-right': this.paddingRight + 'px'
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#content-header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
}

.container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 40px;
}

h1 {
  font-size: 42px;
}
</style>
