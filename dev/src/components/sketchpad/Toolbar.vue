<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="toolbar" :style="getToolbarStyle">
    <div class="top-area" :style="{height: getTopAreaHeight + 'px'}">

      <button-segment
        :width="getButtonSegmentWidth"
        :height="getButtonSegmentHeight"
        :pause="pause"
        :padding="10"
        :segment-id="'tool'"
        :buttons="[
            {
              val: 'pencil',
              img: 'living-room/fire-escape-plan/sketchpad/pencil.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'eraser',
              img: 'living-room/fire-escape-plan/sketchpad/eraser.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            }
          ]"
        :default-button="0"
        :button-option-margin="20"
        :label="'TOOL'"
        :label-wrapper-height="30"
        :label-wrapper-padding-top="10"
        :label-font-size="18"
        :label-color="labelColor"
        :is-mask-on="isMaskOn"
        @options-opened="optionsOpened"
        @option-selected="optionSelected"
      />

      <button-segment
        :width="getButtonSegmentWidth"
        :height="getButtonSegmentHeight"
        :pause="pause"
        :padding="10"
        :segment-id="'style'"
        :buttons="[
            {
              val: 'freehand',
              img: 'living-room/fire-escape-plan/sketchpad/freehand.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'straight',
              img: 'living-room/fire-escape-plan/sketchpad/straight.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'rectangle',
              img: 'living-room/fire-escape-plan/sketchpad/rectangle.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            }
          ]"
        :default-button="0"
        :button-option-margin="20"
        :label="'STYLE'"
        :label-wrapper-height="30"
        :label-wrapper-padding-top="10"
        :label-font-size="18"
        :label-color="labelColor"
        :is-mask-on="isMaskOn"
        @options-opened="optionsOpened"
        @option-selected="optionSelected"
      />

      <button-segment
        :width="getButtonSegmentWidth"
        :height="getButtonSegmentHeight"
        :pause="pause"
        :padding="10"
        :segment-id="'thickness'"
        :buttons="[
            {
              val: 'thin',
              img: 'living-room/fire-escape-plan/sketchpad/thin.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'medium',
              img: 'living-room/fire-escape-plan/sketchpad/medium.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'thick',
              img: 'living-room/fire-escape-plan/sketchpad/thick.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'very-thick',
              img: 'living-room/fire-escape-plan/sketchpad/very_thick.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            }
          ]"
        :default-button="1"
        :button-option-margin="20"
        :label="'THICKNESS'"
        :label-wrapper-height="30"
        :label-wrapper-padding-top="10"
        :label-font-size="18"
        :label-color="labelColor"
        :is-mask-on="isMaskOn"
        @options-opened="optionsOpened"
        @option-selected="optionSelected"
      />

      <button-segment
        :width="getButtonSegmentWidth"
        :height="getButtonSegmentHeight"
        :pause="pause"
        :padding="10"
        :segment-id="'color'"
        :buttons="[
            {
              val: 'black',
              img: 'living-room/fire-escape-plan/sketchpad/color.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#0E0E0E',
              activeFillColor: '#0E0E0E'
            },
            {
              val: 'red',
              img: 'living-room/fire-escape-plan/sketchpad/color.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#DA291C',
              activeFillColor: '#DA291C'
            },
            {
              val: 'blue',
              img: 'living-room/fire-escape-plan/sketchpad/color.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#24135F',
              activeFillColor: '#24135F'
            },
            {
              val: 'yellow',
              img: 'living-room/fire-escape-plan/sketchpad/color.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#FFCD00',
              activeFillColor: '#FFCD00'
            },
            {
              val: 'green',
              img: 'living-room/fire-escape-plan/sketchpad/color.svg',
              regularBgColor: '#F5F5F5',
              activeBgColor: '#FFCD00',
              regularFillColor: '#006400',
              activeFillColor: '#006400'
            }
          ]"
        :default-button="0"
        :button-option-margin="20"
        :label="'COLOR'"
        :label-wrapper-height="30"
        :label-wrapper-padding-top="10"
        :label-font-size="18"
        :label-color="labelColor"
        :is-mask-on="isMaskOn"
        @options-opened="optionsOpened"
        @option-selected="optionSelected"
      />

    </div>

    <div class="bottom-area" :style="{'height': bottomAreaHeight + 'px'}">
      <div class="left">
        <toolbar-button
          class="center"
          :pause="pause"
          :segment-id="'clear'"
          :button-val="'clear'"
          :img="'living-room/fire-escape-plan/sketchpad/trashcan.svg'"
          :width="60"
          :height="60"
          :padding="10"
          :border-radius="60 / 2"
          :top="(bottomAreaHeight - 60) / 2"
          :regular-bg-color="'#24135F'"
          :active-bg-color="'#FFCD00'"
          :regular-fill-color="'#F5F5F5'"
          :active-fill-color="'#24135F'"
          :customElev="0"
          @button-clicked="optionSelected"
        />
      </div>
      <div class="right">
        <toolbar-button
          class="center"
          :pause="pause"
          :segment-id="'undo'"
          :button-val="'undo'"
          :img="'living-room/fire-escape-plan/sketchpad/undo.svg'"
          :width="60"
          :height="60"
          :padding="10"
          :border-radius="60 / 2"
          :top="(bottomAreaHeight - 60) / 2"
          :regular-bg-color="'#24135F'"
          :active-bg-color="'#FFCD00'"
          :regular-fill-color="'#F5F5F5'"
          :active-fill-color="'#24135F'"
          :customElev="0"
          @button-clicked="optionSelected"
        />
      </div>
    </div>

  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import ButtonSegment from './ButtonSegment.vue'
import ToolbarButton from './ToolbarButton.vue'
import MixinMaterials from '@/mixins/materials.js'

export default {
  name: 'toolbar',
  mixins: [MixinMaterials],
  components: {
    ButtonSegment,
    ToolbarButton
  },
  data () {
    return {
      elev: 2,
      toolbarPadding: 10,
      bottomAreaHeight: 80,
      numberOfButtons: 4
    }
  },
  props: {
    width:  Number,
    height: Number,
    pause: Boolean,
    bgColor: String,
    labelColor: String,
    isMaskOn: Boolean
  },
  computed: {
    getToolbarStyle () {
      return {
        'width': this.width + 'px',
        'height': this.height + 'px',
        'padding': this.toolbarPadding + 'px',
        'background-color': this.bgColor
      }
    },
    getTopAreaHeight () {
      return this.height - (this.toolbarPadding * 2) - this.bottomAreaHeight
    },
    getButtonSegmentWidth () {
      return this.width - this.toolbarPadding * 2
    },
    getButtonSegmentHeight () {
      return this.getTopAreaHeight / this.numberOfButtons
    }
  },
  methods: {
    optionsOpened (data) {
      this.$emit('options-opened', data)
    },
    optionSelected (data) {
      this.$emit('option-selected', data)
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#toolbar {
  background-color: lightgrey;
  float: left;
}

.center {
  margin: 0 auto;
}

.bottom-area .left {
  height: 100%;
  width: 50%;
  float: left;
  position: relative;
}

.bottom-area .right {
  height: 100%;
  width: 50%;
  float: right;
  position: relative;
}
</style>
