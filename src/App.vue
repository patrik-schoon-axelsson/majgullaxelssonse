<template>
  <div>
    <header>
      <base-navbar></base-navbar>
    </header>
    <main>
      <router-view v-slot="{ Component }">
      <transition 
          enter-active-class="animate__animated animate__fadeIn" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script>
import M from 'materialize-css';
import BaseFooter from './components/ui/base/BaseFooter.vue';

export default {
  components: { BaseFooter },
  mounted() {
    M.AutoInit();
  },
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
        background-color: #fff;
        padding: 1rem;
      }
}

body {
  z-index: -9999;
  top: 0px;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/background-img/samling_bocker.jpeg'), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
  background-repeat: no-repeat;
  background-size: cover;
}
.view__wrapper {
  margin-top: 2rem;
  height: 80vh;
  max-width: 90vw;
  background-color: #fff;
  position: 50%;
  border-radius: 15px;
  padding: 1.5rem;
  overflow: auto;
  margin-bottom: 0px;
}

::-webkit-scrollbar {
  display: block;
  width: 1px;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background:rgba(0, 0, 0, 0.8);
    width: 3px;
    height: 3px;
}
</style>
