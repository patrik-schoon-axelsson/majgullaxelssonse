<template>
  <div v-if="loading">
    <div>
      <h1 class="center-align"> Laddar nyheter... </h1>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
  <section id="homeBG" v-else>
    <h3 class="center white-text" id="display-logo">Majgull Axelsson - Författare & Föreläsare</h3>
    <br>
    <h6 class="center white-text">Senaste nyheter: </h6>  
        <div class="carousel">         
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
</section>
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

    // Data Fetching

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

    })
    .finally(() => {
      // Carousel initialization:

      M.Carousel.init(document.querySelectorAll('.carousel'), {
        numVisible: 6,
        shift: 25,
        padding: 15,
        dist: -50
      });
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.carousel {
  height: 600px;
  margin-bottom: 2rem;
}
#homeBG {
  z-index: -9999;
  top: 0;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/background-img/samling_bocker.jpeg');
  background-image: url('~@/assets/background-img/samling_bocker.jpeg'), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
  background-repeat: no-repeat;
  background-size: cover;
}
#display-logo {
  margin-top: 180px;
  font-size: 2.5rem;
  font-family: 'Dancing Script', cursive;
}
h6 {
  font-size: 1.8rem;
}
</style>