<template>
  <div class="z-depth-2">
    <div class="container">
      <strong><h5 class="center">MajgullAxelsson.SE</h5></strong>
      <hr>
      <img class="responsive-img circle" src="@/assets/Majgull_axelsson_portrait.jpg">
      <hr>
    </div>
      <h5 class="center"> Allmänna Länkar: </h5>
      <div class="container">
        <ul>
        <li><a class="btn" target="_blank" href="http://www.norstedts.se/forfattare/115660-majgull-axelsson">Norstedts författarsida</a></li>
        <li><a class="btn" target="_blank" href="https://www.goodreads.com/author/show/165549.Majgull_Axelsson">Goodreads</a></li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AboutLinks',
  data(){
    return {

    }
  },
  methods: {
    fetchLinks() {
      
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

h5 {
    font-family: 'Roboto', sans-serif;
}

.btn {
  width: 100%;
  margin: 0.5rem;
}

</style>