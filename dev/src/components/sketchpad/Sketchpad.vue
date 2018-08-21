<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    id="sketchpad">
    <v-touch
      v-if="showMask"
      class="mask"
      :style="{width: width + 'px', height: height + 'px'}"
      @tap="closeToolbarButtonOptions">
    </v-touch>
    <toolbar
      :width="toolbarWidth"
      :height="height"
      :pause="pause"
      :bg-color="'#24135F'"
      :label-color="'#F5F5F5'"
      :isMaskOn="showMask"
      @options-opened="optionsOpened"
      @option-selected="optionSelected"
    />
    <paper
      :width="width - toolbarWidth"
      :height="height"
      :pause="pause"
      :toolbar-button-input="toolbarButtonInput"
    />
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import Toolbar from './Toolbar.vue'
import Paper   from './Paper.vue'
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'sketchpad',
  mixins: [MixinMaterials],
  components: {
    Toolbar,
    Paper
  },
  data () {
    return {
      elev: 2,
      toolbarWidth: 160,
      showMask: false,
      toolbarButtonInput: null
    }
  },
  props: {
    width: Number,
    height: Number,
    pause: Boolean
  },
  methods: {
    optionsOpened (data) {
      this.showMask = true
    },
    optionSelected (data) {
      this.showMask = false
      this.toolbarButtonInput = data
    },
    closeToolbarButtonOptions () {
      this.showMask = false
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#sketchpad {
  height: 100%;
}

.mask {
  position: absolute;
  z-index: 600;
  /*background-color: grey;*/
}

</style>
