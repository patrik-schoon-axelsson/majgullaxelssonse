<template>
  <div>
    <base-navbar></base-navbar>
    <br>
      <router-view v-slot="{ Component }">
      <transition 
          enter-active-class="animate__animated animate__fadeIn" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import M from 'materialize-css';

export default {
  mounted() {
    M.AutoInit();
  },
  computed: {
    userLoggedIn(){
      return this.$store.state.user;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Roboto+Slab:wght@400;700&display=swap');

html {
  font-size: 62.5%;
  font-family: 'Roboto Slab', serif;
      body {
        font-size: 1.6rem;
      }  
      .z-depth-2 {
        padding: 1rem;
      }
}

</style>
