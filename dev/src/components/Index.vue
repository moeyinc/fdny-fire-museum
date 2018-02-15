<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="wrapper">
    <p class="top-text">
      Shortcuts for debug.
    </p>
    <ul>
      <li>
        <router-link :to="'kitchen'">Kitchen</router-link>
      </li>
      <li>
        <router-link :to="'bathroom'">Bathroom</router-link>
      </li>
      <li>
        <router-link :to="'living-room'">Living Room</router-link>
      </li>
      <li>
        <router-link :to="'bedroom'">Bed Room</router-link>
      </li>
    </ul>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'index'
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.wrapper {
  padding: 20px;
}

.top-text {
  padding: 20px;
  font-size: 36px;
}

ul {
  padding: 20px;
  font-size: 32px;
}

li {
  margin-left: 60px;
  text-decoration: underline;
  line-height: 1.5em;
}
</style>
