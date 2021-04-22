<template>
<section class="z-depth-2">
  <div id="spinner" v-if="loading"></div>
  <form @submit.prevent="addNewsItem">
    <h5 class="center-align">Lägg till nyhet:</h5>
    <br>
    <div class="row">
        <div class="col s12 m6">
            <input v-model="title" type="text" name="title" required>
            <label for="title">* Titel: </label>
        </div>
        <div class="col s12 m6">
            <input :placeholder="currentUser.email" disabled>
            <label for="title">* Författare: </label>
        </div>       
    </div>
    <br>
    <div class="row">
        <div class="col s12">
            <label for="content">* Innehåll:  {{ content.length }} / 1000</label>
            <textarea class="materialize-textarea" v-model.trim="content" name="content" data-length="1000" required></textarea>
        </div>
    </div>    
    <br>
    <div class="row">
        <div class="input-field col s12 m6">
            <select v-model="category">
                <option value="" selected disabled>Välj kategori</option>
                <option value="news">Nyheter</option>
                <option value="event">Evenemang</option>
                <option value="interview">Intervju</option>
            </select>
            <label>Kategori</label>
        </div>
        <div class="col s12 m6">
            <input type="url" placeholder="Extern länk..." name="url" v-model="url">
            <label for="url">Länk (Externa länkar, exempelvis till intervjuer eller artiklar hos förlaget)</label>
            <br>
            <a v-if="category == 'interview' " :href="this.url" class="btn red darken-4" target="_blank"><i class="tiny material-icons">comment</i> Intervju</a>
            <a v-else-if="category == 'event'" :href="this.url" class="btn blue darken-4" target="_blank"><i class="tiny material-icons">event</i> Evenemang</a>
            <a v-else :href="this.url" class="btn grey darken-4"><i class="tiny material-icons">feedback</i> Nyhet</a>
        </div>
    </div>
    <br>
    <button class="btn" type="submit">Lägg till nyhet</button>
  </form>
</section>
</template>

<script>
import firebase from 'firebase/app';
let db = firebase.firestore()
import M from 'materialize-css';

export default {
    data() {
        return {
            loading: false,
            title: '',
            content: '',
            category: null,
            url: ''
        }
    },
    mounted() {
        M.AutoInit();
    },
    methods: {
        addNewsItem(){
            const NewsItem = {
                title: this.title,
                content: this.content,
                timeAdded: firebase.firestore.Timestamp.now(),
                author: this.$store.state.user.email,
                category: this.category,
                utl: this.url
            }

            db.collection("news").doc().set(NewsItem)
                                .then(() => {
                                    M.toast({html: `Nytt inlägg med rubrik ${this.title} är nu tillagd!`});

                                    this.title = '';
                                    this.content = '';
                                    this.category = '';
                                    this.url = '';

                                })
                                .catch((error) => {
                                    M.toast({html: `Ett fel har inträffat, servers felkod är: ${error}! Vänligen kontrollera att ditt inlägg sparats.`});
                                });
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    }
}
</script>

<style>

</style>