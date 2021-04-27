<template>
<section id="homeBG">
  <div class="container">
    <div class="row">
      <div class="col s12 m7 l8">
        <about-main></about-main>
      </div>
      <div class="col s12 m5 l4">
        <about-links></about-links>
      </div>
    </div>
  </div>
</section>
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
#homeBG {
  z-index: -9999;
  top: 0;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/background-img/samling_bocker.jpeg');
  background-image: url('~@/assets/background-img/samling_bocker.jpeg'), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
