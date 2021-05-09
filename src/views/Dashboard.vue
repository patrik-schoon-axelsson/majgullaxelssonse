<template>
<section class="container">
  <div class="z-depth-2 ">
    <div class="row">
      <h1 class="center">Administratörsgränsnitt</h1>
      <br>
      <p class="center">Använd denna sida för att lägga in nya inlägg i nyheterna, nya profiler för böcker eller för nya länkar i "om"-sektionen.</p>
    <br>
    <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col"><router-link to="/dashboard/add-news">Lägg till nyheter</router-link></li>
        <li class="tab col"><router-link to="/dashboard/add-books">Lägg till böcker</router-link></li>
        <li class="tab col"><router-link to="/dashboard/add-links">Lägg till länkar</router-link></li>
      </ul>
    </div>
    </div>
  </div>
    <router-view name="toolbox"></router-view>
  </div>
</section>
</template>

<script>

export default {
  data(){
    return {
      isLoading: null,
    }
  },
}
</script>

<style>
.z-depth-2 {
  background-color: #fff;
  position: 50%;
  height: 80vh;
  margin-top: 16px;
  margin-bottom: 16px;
  overflow: scroll;
}

</style>