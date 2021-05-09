<template>
  <div v-if="loading">
    <div class="z-depth-2 container">
      <h1 class="center-align"> Laddar nyheter... </h1>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
  <section class="container" v-else>
  <div class="z-depth-2">
    <h2 class="center" id="display-logo">Majgull Axelsson - Författare & Föreläsare</h2>
    <br>
    <div class="container">
    <p class="flow-text">Välkommen till MajgullAxelsson.se. Då Majgull valt att inte sköta sociala medier själv är detta den officiella kontaktsidan för henne
      och hennes författarskap. Här kan ni se kommande framträdanden, nyheter om Majgull och hennes arbete samt läsa om Majgulls böcker.
    </p>
    <br>
    <h6 class="center">Senaste nyheter: </h6>
    </div>
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
  margin-top: 0px;
  max-height: 760px;
}

#display-logo {
  font-size: 3.5rem;
  font-family: 'Dancing Script', cursive;
}
h6 {
  font-size: 1.8rem;
}
.z-depth-2 {
  background-color: #fff;
  position: 50%;
  height: 80vh;
  margin-top: 16px;
  margin-bottom: 16px;
  overflow: scroll;
}
</style>