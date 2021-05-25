<template>
<div v-if="!isLoading">
  <div class="container">
    <div class="z-depth-2 view__wrapper">
      <ul class="tabs">
        <book-tab-link v-for="book in bookState"
        :key="book.id"
        :title="book.title"
        :yearOfRelease="book.yearOfRelease"
        :id="book.id"></book-tab-link>
      </ul>
      <router-view name="books"></router-view>
   </div>
  </div>
</div>
<div class="container view__wrapper" v-else>
  <div>
      <h1 class="center-align"> Laddar böcker... </h1>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
  </div>
</div>
</template>

<script>
import store from '@/store';
import M from 'materialize-css';
import firebase from 'firebase/app';
import BaseBookCard from '../components/ui/base/BaseBookCard.vue';
import BookTabLink from './BookViews/BookTabLink.vue';

M.AutoInit();

const db = firebase.firestore();

export default {
  components: { BaseBookCard, BookTabLink },
  data() {
    return {
      isLoading: false,
      booksArray: null,
      error: null
      }
  },
  methods: {
    fetchBookData() {
      this.isLoading = true;

      store.dispatch('setBookOnLoad');

      this.isLoading = false;

    },
    onItemDeletion(id) {
      const book = db.collection("books").doc(id);

      book.delete().then((doc) => {
        
        // Refresh all contents on reload, to keep everything in sync between each change in the DB. Once Vuefire is updated for Vue3, this'll be replaced.

        this.fetchBookData();

        M.toast({html: `<strong> Dokument med ID ${id} har tagits bort från databasen.`});

      }).catch((error) => {
        console.log(error)
        this.isLoading = false;
      });    
    }
  },
  created() {
      this.isLoading = true;

      this.fetchBookData()

      this.isLoading = false;
  },
  computed: {
    bookState(){
      return store.getters.getBooks;
    }
  }
}
</script>

<style scoped>

ul {
  margin-bottom: 1rem;
}

</style>