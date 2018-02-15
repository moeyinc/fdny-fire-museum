<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="escape-plan-wrapper">
    <content-header :bgColor="'#FFCE00'">
      <h1 slot="content-title"><span class="white">MY FAMILY </span><span class="red">FIRE ESCAPE PLAN</span></h1>
    </content-header>

    <main role="main">
      <div class="top-text">
        <h2>3. Identify a safe place to meet outside.</h2>
        <p>
          Establish a safe place for everyone to meet outside. Wait to call 9-1-1 until you are outside at your meeting place.
        </p>
      </div>
      <div class="bottom-images">
        <div class="image-card-container">
          <image-card
            :img="'living-room/fire-escape-plan/park.png'"
            :text="'Park'"
            :width="'380px'"
            :height="'380px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'260px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'L14'"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'living-room/fire-escape-plan/call-box.png'"
            :text="'Emergency Call Box'"
            :width="'380px'"
            :height="'380px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'260px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'L14'"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'living-room/fire-escape-plan/house.png'"
            :text="'Neighbor\'s Home'"
            :width="'380px'"
            :height="'380px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'260px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'L14'"
          />
        </div>
        <div class="image-card-container">
          <image-card
            :img="'living-room/fire-escape-plan/street.png'"
            :text="'Street Corner'"
            :width="'380px'"
            :height="'380px'"
            :padding="'20px 20px 0 20px'"
            :image-height="'260px'"
            :text-height="'100px'"
            :font-size="'36px'"
            :clickable="true"
            :destination="'L14'"
          />
        </div>
      </div>
    </main>

    <content-footer
      :bgColor="'#FFCE00'"
      :bgColorActive="'#DA291C'"
      :has-left-button="true"
      :has-right-button="true"
      @left-clicked="footerLeftClicked"
      @right-clicked="footerRightClicked"
      >
      <div slot="left-button-content">
        <arrow-left-thick-icon class="arrow-left-thick-icon" />
        <p>
          BACK
        </p>
      </div>
      <div slot="right-button-content">
        <arrow-right-thick-icon class="arrow-right-thick-icon" />
        <p>
          NEXT
        </p>
      </div>
    </content-footer>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import ContentHeader from '@/components/ContentHeader.vue'
import ContentFooter from '@/components/ContentFooter.vue'
import ImageCard     from '@/components/ImageCard.vue'
import ArrowLeftThickIcon from 'vue-material-design-icons/arrow-left-thick.vue'
import ArrowRightThickIcon from 'vue-material-design-icons/arrow-right-thick.vue'

export default {
  name: 'L13',
  components: {
    ContentHeader,
    ContentFooter,
    ImageCard,
    ArrowLeftThickIcon,
    ArrowRightThickIcon
  },
  methods: {
    footerLeftClicked () {
      this.$router.push({ name: 'L12' })
    },
    footerRightClicked () {
      this.$router.push({ name: 'L14' })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#escape-plan-wrapper {
  position: relative;
  height: 100%;
}

.arrow-left-thick-icon {
  left: 145px;
}

.arrow-right-thick-icon {
  left: 315px;
}

main {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 880px;
  overflow: hidden;
  padding: 40px 60px;
  background-color: #F5F5F5;
}

.top-text {
  width: 100%;
  height: 40%;
}

.top-text h2 {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #DA291C;
}

.top-text p {
  font-size: 42px;
}

.bottom-images {
  width: 100%;
  height: 60%;
  text-align: center;
}

.image-card-container {
  display: inline-block;
  margin: 0 20px;

}

</style>
