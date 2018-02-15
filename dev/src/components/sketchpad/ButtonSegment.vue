<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="button-segment" :style="{height: height + 'px'}">
    <div class="button-wrapper" :style="{height: getButtonWrapperHeight + 'px'}">
      <div
        class="button-options-container"
        :style="getButtonOptionsContainerStyle">
        <toolbar-button
          :pause="pause"
          :segment-id="segmentId"
          :button-val="selectedButton.val"
          :img="selectedButton.img"
          :width="getButtonWrapperHeight"
          :height="getButtonWrapperHeight"
          :float="'left'"
          :padding="5"
          :border-radius="10"
          :top="0"
          :regular-bg-color="selectedButton.regularBgColor"
          :active-bg-color="selectedButton.activeBgColor"
          :regular-fill-color="selectedButton.regularFillColor"
          :active-fill-color="selectedButton.activeFillColor"
          @button-clicked="optionsOpened"
        />
        <div
          class="button-options"
          v-if="showOptions"
          >
          <toolbar-button
            v-for="(button, index) in buttons"
            v-if="button.val !== selectedButton.val"
            :key="index"
            :style="{'margin-left': buttonOptionMargin + 'px'}"
            :pause="pause"
            :segment-id="segmentId"
            :button-val="button.val"
            :img="button.img"
            :width="getButtonWrapperHeight"
            :height="getButtonWrapperHeight"
            :float="'left'"
            :padding="5"
            :border-radius="10"
            :top="0"
            :regular-bg-color="button.regularBgColor"
            :active-bg-color="button.activeBgColor"
            :regular-fill-color="button.regularFillColor"
            :active-fill-color="button.activeFillColor"
            :custom-elev="8"
            @button-clicked="optionSelected"
          />
        </div>
      </div>
    </div>
    <div class="label-wrapper" :style="getLabelWrapperStyle">
      {{ label }}
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import ToolbarButton from './ToolbarButton.vue'

export default {
  name: 'button-segment',
  components: {
    ToolbarButton
  },
  data () {
    return {
      selectedButton: null,
      showOptions: false
    }
  },
  props: {
    width: Number,
    height:  Number,
    pause: Boolean,
    padding: Number,
    segmentId: String,
    buttons: Array,
    defaultButton: Number,
    buttonOptionMargin: Number,
    label: String,
    labelWrapperHeight: Number,
    labelWrapperPaddingTop: Number,
    labelFontSize: Number,
    labelColor: String,
    isMaskOn: Boolean
  },
  created () {
    // set the first item as selected
    this.selectedButton = this.buttons[this.defaultButton]
  },
  watch: {
    isMaskOn (val) {
      if (val === false) {
        // when mask dissappeared (because it's clicked),
        // close options
        this.showOptions = false
      }
    }
  },
  computed: {
    getButtonWrapperHeight () {
      return this.height - (this.padding * 2) - this.labelWrapperHeight
    },
    getLabelWrapperStyle () {
      return {
        'height': this.labelWrapperHeight + 'px',
        'padding-top': this.labelWrapperPaddingTop + 'px',
        'font-size': this.labelFontSize + 'px',
        'color': this.labelColor
      }
    },
    getButtonOptionsContainerStyle () {
      let myWidth = this.getButtonWrapperHeight
      if (this.showOptions) {
        myWidth = (this.getButtonWrapperHeight + this.buttonOptionMargin) * this.buttons.length
      }

      return {
        'left': (this.width - this.getButtonWrapperHeight) / 2 + 'px',
        'width': myWidth + 'px'
      }
    }
  },
  methods: {
    optionsOpened (data) {
      // fire an event for the parent component
      this.$emit('options-opened', data)

      // show options
      this.showOptions = true
    },
    optionSelected (data) {
      // get the newly selected button
      let newSelectedButton = this.selectedButton

      for (let button of this.buttons) {
        if (button.val === data.val) {
          newSelectedButton = button
        }
      }

      // switch the selected button with the new one
      this.selectedButton = newSelectedButton

      // fire an event for the parent component
      this.$emit('option-selected', data)

      // close options
      this.showOptions = false
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.button-segment {
  position: relative;
  padding: 10px;
}

.button-wrapper {
}

.button-options-container {
  position: absolute;
}

.label-wrapper {
  text-align: center;
}

.center {
  margin: 0 auto;
}
</style>
