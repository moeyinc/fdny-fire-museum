<!-- =================================================
 Vue Template
================================================== -->
<template>
  <v-touch
    class="image-card-wrapper"
    :style="[{width: width, height: height, padding: padding},
             getBGColor]"
    @touchstart.native="toggle"
    @touchend.native="toggle"
    @touchcancel.native="resetClick"
    @tap="pageTransition">
    <div
      class="top-image"
      :style="[setBGImage(getImageAssetFilePath(img)),
               {height: imageHeight}]">
    </div>
    <div
      class="bottom-text"
      :style="[{height: textHeight}, {'text-align': textAlign}]">
      <p :style="{'font-size': fontSize}">
        {{text}}
        <span v-if="text2"><br />{{text2}}</span>
      </p>
    </div>
  </v-touch>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'image-card',
  mixins: [MixinMaterials],
  data () {
    return {
      elev: 2,
      usualElev: 2,
      raisedElev: 16,
      isActive: false
    }
  },
  props: {
    img: String,
    text: String,
    text2: String,
    width: String,
    height: String,
    padding: String,
    imageHeight: String,
    textHeight: String,
    fontSize: String,
    textAlign: {type: String, default: 'center'},
    clickable: Boolean,
    destination: String,
    customElev: Number
  },
  created () {
    // set a custom elevation
    if (this.customElev !== undefined) {
      this.elev = this.customElev
      this.usualElev = this.customElev
    }
  },
  computed: {
    // change background color when it's clicked
    getBGColor () {
      if (this.clickable) {
        if (this.isActive) {
          return {'background-color': '#FFCD00'}
        } else {
          return {'background-color': 'white'}
        }
      } else {
        return {'background-color': '#F5F5F5'}
      }
    }
  },
  watch: {
    isActive (val) {
      if (val === true) {
        // active
        this.elev = this.raisedElev
      } else {
        // inactive
        this.elev = this.usualElev
      }
      // re-apply shadow
      this.applyShadow()
    }
  },
  methods: {
    // switch the active value to change the background color
    toggle () {
      if (this.clickable) {
        this.isActive = !this.isActive
      }
    },
    // transit to a specified page
    pageTransition () {
      if (this.clickable) {
        this.$router.push({ name: this.destination })
      }
    },
    resetClick () {
      console.log('reset click')
      if (this.clickable) {
        this.isActive = false
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.image-card-wrapper {
  display: inline-block;
  background-color: white;
  border-radius: 10px;
}

.bottom-text {
  padding: 5px;
  display: table;
  text-align: center;
  width: 100%;
}

.bottom-text p {
  display: table-cell;
  vertical-align: middle;
  font-size: 24px;
}
</style>
