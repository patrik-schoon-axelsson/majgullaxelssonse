<template>
  <div v-if="isLoading">
    <div class="z-depth-2 container view__wrapper">
      <h3 class="center-align"> Laddar äldre nyheter... </h3>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
      <div class="view__wrapper z-depth-2">
          <div class="row">
              <div class="col m4">
                  Navigation
              </div>
              <div class="col m8 s12">
                  content
              </div>
          </div>
      </div>    
  </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false
        }
    },
    mounted() {

    }
}
</script>

<style>

</style>