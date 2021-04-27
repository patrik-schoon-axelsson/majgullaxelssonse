<template>
  <div class="z-depth-2" v-if="!isLoading">
    <div class="container">
      <strong><h5 class="center">MajgullAxelsson.SE</h5></strong>
      <hr>
      <img class="responsive-img circle" src="@/assets/Majgull_axelsson_portrait.jpg">
      <hr>
    </div>
      <h5 class="center"> Allmänna Länkar: </h5>
      <div class="container">
        <ul>
          <link-button v-for="link in linksArray" :href="link.href" :name="link.name" :key="link.name"></link-button>
        </ul>
      </div>
  </div>
<div class="center-align" v-else>
  <div class="preloader-wrapper active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LinkButton from '@/components/ui/LinkButton.vue';
import firebase from 'firebase/app';

let links = firebase.firestore().collection('links')

export default {
  name: 'AboutLinks',
  components: {
    LinkButton
  },
  data(){
    return {
      isLoading: false,
      linksArray: [],

    }
  },
  mounted() {
    this.fetchLinks();
  },
  methods: {
    fetchLinks() {
      this.isLoading = true;

      links.get()
           .then((collection) => {
              collection.forEach((i) => {
                this.linksArray.push(i.data());
                })
            })
            .finally(() => {
                    this.isLoading = false;
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err)
             })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

z-depth-2 {
  background-color: #fff;
}

h5 {
    font-family: 'Roboto', sans-serif;
}

.btn {
  width: 100%;
  margin: 0.5rem;
}

</style>