<template>
  <div>
      <div class="jumbotron">
        <div class="container">
          <h1 class="center-align"> Majgull Axelssons böcker... </h1>
          <br>
          <p class="center-align">
            Ovanför kan du få information om Majgulls egna böcker. Här under kan du läsa Majgulls boktips!
          </p>
        </div>
      </div>
  <div class="row">
    <div class="col s12 m5" v-for="tip in bookTips" :key="tip.timeAdded"> 
      <div class="card-panel grey darken-2">
        <span class="white-text">
          <h4>{{tip.title}}</h4>
          <p class="flow-text">{{tip.content}}</p>
        </span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

const db = firebase.firestore();

export default {
    data(){
      return{
        bookTips: []
      }
    },
    mounted() {
      this.fetchBookTips();
    },
    methods: {
      fetchBookTips() {
        db.collection('bookTips').get()
        .then((data) => {
          data.forEach(doc => this.bookTips.push(doc.data()))
        })
        .catch(err => console.log(err))

      }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.jumbotron {
  font-family: 'Dancing Script', cursive;
}


</style>