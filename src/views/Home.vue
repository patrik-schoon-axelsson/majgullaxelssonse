<template>
  <div v-if="loading">
    <div>
      <h1 class="center-align"> Laddar nyheter... </h1>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
  <div class="row" v-else>   
    <div class="parallax-container">
      <div class="parallax">
          <img src="@/assets/parallax/bookspread-bg.jpg">
        </div>
      </div>
    <div class="section white">
      <div class="row">
          <h3 class="center-align">Senaste nyheter</h3> 
        <div class="container">         
            <news-card v-for="item in newsArray"
            :url="item.url"
            :category="item.category"
            :key="item.id"
            :title="item.title"
            :content="item.content"
            :timeStamp="item.timeAdded"
            :author="item.author"
            :id="item.id"
            @delete-item-by-id="onItemDeletion"></news-card>    
        </div>
      </div>
    </div>
    <div class="parallax-container">
      <div class="parallax">
        <img src="@/assets/parallax/aprilhaxan-bg.jpg">
      </div>
    </div>
    <div class="section white">
        <h3 class="center">Majgull Axelsson - Författare & Föreläsare</h3>  
        <p class="flow-text center">Lite lorem ipsum här om sidan i allmänhet, bara som ett layout-test...</p>
    </div>
  </div>
</template>

<script>
import NewsCard from './../components/ui/NewsCard.vue';
import firebase from 'firebase';

let db = firebase.firestore();
const news = db.collection("news");

export default {
  name: 'Home',
  components: { NewsCard },
  data() {
    return {
      loading: false,
      newsArray: [],
      }
  },
  methods: {
    onItemDeletion(id) {
      this.loading = true;
      const newsItem = news.doc(id);

      newsItem.delete().then((doc) => {
        this.newsArray = []
        news.orderBy("timeAdded", 'desc').limit(6).get().then((news) => {
            news.forEach((doc) => {
              
              let newsItem = {
                id: doc.id, 
                title: doc.data().title,
                content: doc.data().content,
                timeAdded: doc.data().timeAdded,
                author: doc.data().author,
                category: doc.data().category,
                url: doc.data().url
              }
              console.log(newsItem)
              this.newsArray.push(newsItem);
           });
            this.loading = false;
          }).catch((error) => {
            this.loading = false;
            console.log(error)
          });
      }).catch(error => {
        this.loading = false;
        console.log(error);
      }); 

    }
  },
  mounted() {
    this.loading = true

    news.orderBy("timeAdded", 'desc').get().then((news) => {

      news.forEach((doc) => {
        
        let newsItem = {
          id: doc.id, 
          title: doc.data().title,
          content: doc.data().content,
          timeAdded: doc.data().timeAdded,
          author: doc.data().author,
          category: doc.data().category,
          url: doc.data().url
        }
        this.newsArray.push(newsItem);
      });
      this.loading = false;

    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>
