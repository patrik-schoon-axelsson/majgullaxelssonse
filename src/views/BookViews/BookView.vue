<template>
<div class="center-align" v-if="isLoading">
    <h2 class="center">Laddar...</h2>
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
<div class="row" v-else>
        <div class="col s12">
                <base-book-card
                        :title="this.title"
                        :content="this.content"
                        :quote="this.quote"
                        :publisher="this.publisher"
                        :isbn="this.isbn"
                        :img="this.coverURL"
                        :id="this.$route.params.id"
                        @delete-item-by-id="onItemDeletion">
                </base-book-card>
    </div>
</div>
</template>

<script>
import store from '@/store';
import BaseBookCard from '@/components/ui/base/BaseBookCard.vue';
import M from 'materialize-css';
import firebase from 'firebase/app';
const db = firebase.firestore();
M.AutoInit();

export default {
    components: {
        BaseBookCard
    },
    data(){
        return  {
        isLoading: false,
        title: '',
        content: '',
        quote: '',
        publisher: '',
        isbn: '',
        coverURL: '',
        id: this.$route.params.id
        
      }
    },
    created() {
      this.isLoading = true;
      
      this.onLoadFetch();

      this.isLoading = false;
    },
    methods: {
        onLoadFetch() {
            const book = db.collection("books").doc(this.$route.params.id);

            book.get().then(bookData => {
                this.title = bookData.data().title;
                this.content = bookData.data().content;
                this.quote = bookData.data().quote;
                this.publisher = bookData.data().publisher;
                this.isbn = bookData.data().isbn;
                this.coverURL = bookData.data().coverURL;  
            
            }).catch(error => {
                M.toast({html: `<strong>Ett fel uppstod</strong>: ${error}`});
                this.isLoading = false;
            })
        },
        onItemDeletion(id) {
            const book = db.collection("books").doc(this.$route.params.id);

            book.delete().then((doc) => {

            M.toast({html: `<strong> Dokument med ID ${doc.id} har tagits bort från databasen.`});

        }).catch((error) => {
            M.toast({html: `<strong>Ett fel uppstod</strong>: ${error}`});
        });
            this.isLoading = false;
        }
    },
    watch: {
        $route(to, from) {
            // Handler so there's not a new fetch on exiting these routes.

            const {id} = to.params;
            
            if (id) {
                this.onLoadFetch()
            } else {
                return;
            }
        } 
    },
    computed: {
        bookStateById() {
            return store.getters.getBooks.find(book => book.id === this.id);
        }
    }
}
</script>

<style>

</style>