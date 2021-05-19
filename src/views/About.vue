<template>
<div class="container view__wrapper">
      <div class="row">
        <div class="col s12 m7 l8">
          <about-main></about-main>
        </div>
        <div class="col s12 m5 l4">
          <about-links></about-links>
        </div>
  </div>
</div>
</template>

<script>
import AboutLinks from './AboutViews/AboutLinks.vue';
import AboutMain from './AboutViews/AboutMain.vue';

export default {
  components: {
    AboutMain,
    AboutLinks
  }

}
</script>

<style lang="scss" scoped>
div {
  padding: .5rem;
}

</style>
