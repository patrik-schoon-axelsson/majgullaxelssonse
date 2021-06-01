<template>
  <div v-if="loading">
    <div class="container">
      <h1 class="center-align white-text"> Laddar nyheter... </h1>
      <div class="progress">
        <div class="indeterminate white"></div>
      </div>
    </div>
  </div>
  <section class="container view__wrapper z-depth-2" v-else>
    <h2 class="center" id="display-logo">Majgull Axelsson - Författare & Föreläsare</h2>
    <div class="container">
    <p class="flow-text">Välkommen till MajgullAxelsson.se. Då Majgull valt att inte sköta sociala medier själv är detta den officiella kontaktsidan för henne
      och hennes författarskap. Här kan ni se kommande framträdanden, nyheter om Majgull och hennes arbete samt läsa om Majgulls böcker.
    </p>
  </div>
  <h4 class="center">Senaste nyheter: </h4>
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
  <br>
  <h4 class="center-align"> Nyhetsarkiv</h4>
  <br>
  <div class="row" v-if="archiveActive != 'news_archive'">
    <div class="center-align">
    <p class="flow-text">
      För att se äldre nyheter, tryck på knappen.
    </p>
    <router-link class="btn" to="/news">
      Ladda Nyhetsarkiv
    </router-link>
  </div>
  </div>
  <router-view></router-view>
  </section>
</template>

<script>
import NewsCard from './../components/ui/NewsCard.vue';
import firebase from 'firebase/app';

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
  computed: {
    archiveActive() {
      return this.$route.name
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
        indicators: true,        
      });
    })
    .catch((error) => {
      console.log(error)
    })
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
#display-logo {
  font-size: 3.5rem;
  font-family: 'Dancing Script', cursive;
}
.carousel {
  min-height: 560px;
}
</style>