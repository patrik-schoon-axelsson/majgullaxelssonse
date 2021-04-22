<template>
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
</template>

<script>
import AboutLinks from '../components/ui/About/AboutLinks.vue';
import AboutMain from '../components/ui/About/AboutMain.vue';

export default {
  components: {
    AboutMain,
    AboutLinks
  }

}
</script>

<style scoped>
div {
  padding: .5rem;
}

</style>
