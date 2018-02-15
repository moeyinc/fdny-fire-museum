<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="remainder-circle-wrapper">
    <div class="remainder-container">
      <p>{{remainder}}</p>
    </div>
    <div class="more-container">
      <p>more</p>
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'remainder-circle',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 8
    }
  },
  props: {
    remainder: Number
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#remainder-circle-wrapper {
  position: absolute;
  z-index: 600;
  right: -100px;
  top: -100px;
  width: 400px;
  height: 400px;
  background-color: #FFCE00;
  border-radius: 200px;
}

.remainder-container {
  position: absolute;
  top: 135px;
  left: 125px;
}

.remainder-container p {
  font-size: 150px;
  color: #DA291C;
}

.more-container {
  position: absolute;
  top: 290px;
  left: 170px;
}

.more-container p {
  font-size: 40px;
  color: #DA291C;
}
</style>
