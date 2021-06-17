<template>
  <section>
  <div id="spinner" v-if="isLoading"></div>
  <form @submit.prevent="addBookTipItem">
    <h5 class="center-align">Lägg till boktips:</h5>
    <p class="flow-text">För att lägga till boktips från Majgull!</p>
    <br>
    <div class="row">
        <div class="col s12 m6">
            <input v-model="title" type="text" name="title" required>
            <label for="title">* Titel: </label>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col s12">
            <label for="content">* Innehåll:  {{ content.length }} / 1000</label>
            <textarea class="materialize-textarea" v-model.trim="content" name="content" data-length="1000" required></textarea>
        </div>
    </div>    
    <button class="btn" type="submit">Lägg till boktips</button>
  </form>
</section>
</template>

<script>
import firebase from 'firebase/app';

const db = firebase.firestore();

export default {
    data() {
        return {
            isLoading: false,
            title: '',
            content: '',
        }
    },
    methods: {
        addBookTipItem() {
            this.isLoading = true;

            db.collection('bookTips').doc().set({
                 title: this.title,
                 content: this.content,
                 timeAdded: Date.now()
             })
            .then(() => {
                this.title = '',
                this.content = '',
                this.timeAdded = ''
            })
            .finally(() => {
              M.toast({html: '<p>Boktips tillagd!</p>'})
            this.isLoading = false;
            })
            .catch((err) => {
                M.toast({html: err});
                this.isLoading = false;
            });
        }
    }
}
</script>

<style>

</style>