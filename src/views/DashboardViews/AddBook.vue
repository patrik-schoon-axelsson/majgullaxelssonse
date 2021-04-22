<template>
<section class="z-depth-2">
<div class="row"  v-if="!loadingStatus">
    <div class="col s12 m6">
        <div>
        <form @submit.prevent="addNewBook">
            <h5 class="center-align">Lägg till en ny bok: </h5>
            <br>
                <div class="row">
                <div class="col s12 m6">
                    <input type="text" v-model="title" required placeholder="Bokens titel...">
                    <label for="title">* Titel</label>
                </div>
                <div class="col s12 m6">
                    <div class="file-field input-field">
                        <div class="btn-small">
                            <span>Omslag:</span>
                            <input type="file" @change="imgUpload" required>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <textarea class="materialize-textarea" name="content" maxlength="2500" v-model="content"></textarea>
                        <label for="content">* Sammanfattning av innehåll: ( {{content.length }}/2500 tecken)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m4">    
                        <input type="text" name="isbn" v-model="isbn" required placeholder="ISBN-nummer...">
                        <label for="isbn">* ISBN-nummer: </label>
                    </div>

                    <div class="col s12 m4">    
                        <input type="text" name="publisher" v-model="quote" max="500" required placeholder="Favoritcitat från boken...">
                        <label for="publisher">* Citat:  {{ quote.length }} / 500</label>
                    </div>
                    <div class="col s12 m4">    
                        <input type="number" name="yearReleased" v-model="yearReleased" required placeholder="Utgivningsår...">
                        <label for="publisher">* Utgivningsår</label>
                    </div>
                </div>
                <div class="row">
                <div class="col s12 m4">    
                    <input type="text" name="publisher" v-model="publisher" required placeholder="Nuvarande förlag...">
                <label for="publisher">* Förlag: </label>
                </div>    
                <div class="col s12 m4">
                    <input type="text" v-model="goodreadsURL" required placeholder="Länk till bokens Goodreads sida...">
                    <label for="title">* Länk till Goodreads: </label>
                </div>
                <div class="col s12 m4">
                    <input type="text" v-model="publisherURL" required placeholder="Länk till förlagets sida om boken...">
                    <label for="title">* Länk till förlaget: </label>
                    </div>
                </div>
            <button class="btn" type="submit">Lägg till bok</button>
        </form>
    </div>
    </div>
    <div class="col s12 m6">
        <h5 class="center">Förhandsvisning</h5>
        <div v-if="previewImg">
            <img :src="previewImg">
        </div>
        <div v-else>
            <p class="center">Ladda upp en bild för att se en förhandsvisning.</p>
        </div>
    </div>
    </div>
    <div v-else>
      <div class="container">
      <h1 class="center">Laddar upp filen {{imgFile.name}}. Var vänlig stäng inte fönstret!</h1>
      <br>
       Laddar upp {{ imgFile.name }}: {{ uploadValue }}% 
       <br>
      </div>
       <h5 class="center">Sparar boken i databasen...</h5>
         <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</section>
</template>

<script>
import BaseBookCard from './../../components/ui/base/BaseBookCard.vue';
import firebase from 'firebase/app';
import firebaseApp from '@/firebaseApp.js';
import M from 'materialize-css';
let db = firebase.firestore()

export default {
    components: { BaseBookCard },
    mounted() {
        M.AutoInit();
    },
    data(){
        return {
            imgFile: null,
            title: '',
            content: '',
            isbn: '',
            publisher: '',
            quote: '',
            goodreadsURL:  '',
            publisherURL: '',
            yearReleased: null,
            uploadValue: null,
            loadingStatus: null,
            getDownloadURL: null,
            previewImg: null
        }
    },
    methods: {
      imgUpload(event){   
            this.imgFile = event.target.files[0];
            this.previewImg =  URL.createObjectURL(this.imgFile);
      },
      addNewBook(){
          const coversRef = firebase.storage().ref()
          const uploadTask = coversRef.child(`covers/${this.imgFile.name}`).put(this.imgFile)
          this.loadingStatus = true;

          uploadTask.on('state_changed',  (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            this.uploadValue = progress            
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        
        this.uploadValue = null;
        }, 
        () => {

            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

            this.downloadURL = downloadURL;

            const BookItem = {
                title: this.title,
                content: this.content,
                isbn: this.isbn,
                publisher: this.publisher,
                quote: this.quote,
                yearOfRelease: this.yearReleased,
                timeAdded: firebase.firestore.Timestamp.now(),
                coverURL: this.downloadURL,
                userRef: this.$store.state.user.email,
            }

            db.collection("books").doc().set(BookItem)
                                .then(() => {
                                    this.imgFile = null;
                                    this.title = '';
                                    this.content = '';
                                    this.isbn = '';
                                    this.publisher  = '';
                                    this.quote = '';
                                    this.goodreadsURL =  '';
                                    this.publisherURL = '';
                                    this.yearReleased = null;
                                    this.getDownloadURL = null;
                                    this.previewImg = null;
                                    this.loadingStatus = null;
                                    M.toast({html: `Ny bok med titeln ${this.title} är nu tillagd i databasen!`});
                                })
                                .catch((error) => {
                                    this.imgFile = null;
                                    this.title = '';
                                    this.content = '';
                                    this.isbn = '';
                                    this.publisher  = '';
                                    this.quote = '';
                                    this.goodreadsURL =  '';
                                    this.publisherURL = '';
                                    this.yearReleased = null;
                                    this.getDownloadURL = null;
                                    this.previewImg = null;
                                    this.loadingStatus = null;
                                    this.loadingStatus = null;
                                    M.toast({html: `Ett fel har inträffat, serverns felkod är: ${error}! Vänligen kontrollera att ditt inlägg sparats och försök igen.`});
                                });
                        });
                    },
                );
      }
    }
}
</script>

<style>

</style>