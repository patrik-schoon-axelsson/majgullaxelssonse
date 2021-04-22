<template>
    <a v-if="category === 'interview'" :href="url" class="btn red darken-4" target="_blank"><i class="tiny material-icons">comment</i> Intervju</a>
    <a v-else-if="category === 'event'" :href="url" class="btn blue darken-4" target="_blank"><i class="tiny material-icons">event</i> Evenemang</a>
    <a v-else :href="url" class="btn grey darken-4"><i class="tiny material-icons">feedback</i> Nyhet</a>
</template>

<script>
export default {
  props: ['category', 'url'],
  mounted(){

  }
}
</script>

<style scoped>
a {
  font-size: 1rem;
}

</style>