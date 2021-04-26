<template>
<section class="z-depth-2" v-if="!isLoading">
  <form @submit.prevent="addAboutLinks">
      <h5 class="center-align">Lägg till en ny länk: </h5>
        <div class="row">
            <div class="col s12">
                <div class="input-field col s12">
                <select v-model="category">
                    <option value="" disabled selected>Välj kategori: </option>
                    <option value="general">Allmän</option>
                    <option value="socmedia">Sociala medier </option>
                    <option value="media"> Media </option>
                </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6">
                <input type="text" v-model="linkName" required placeholder="Länktext">
                <label for="title">* Länktext</label>
            </div>
            <div class="col s12 m6">
                <input type="text" v-model="href" required placeholder="URL (Internetaddress)">
                <label for="title">* Klistra in länkens destination här</label>
            </div>
            <br>
            <button class="btn" type="submit">Lägg till länk</button>
        </div>        
  </form>
</section>
<section id="loader" v-else>
<div class="row">
    <div class="container center-align">
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
</div>
</section>
</template>

<script>
import M from 'materialize-css';
import firebase from 'firebase/app';
import firebaseApp from '@/firebaseApp.js';

let db = firebase.firestore();


export default {
    name: 'AddLinks',
    data() {
        return {
            isLoading: false,
            linkName: '',
            href: '',
            category: ''
        }
    },
    mounted(){
        M.AutoInit();
    },
    methods: {
        addAboutLinks(){
        
        this.isLoading = true;

        const linkItem = {
            name: this.linkName,
            href: this.href,
            category: this.category
        }
        
        db.collection('links').doc().set(linkItem)
                                        .then(() => {
                                            this.linkName = '',
                                            this.href = '',
                                            this.category = ''
                                        })
                                        .finally(() => {
                                            M.toast({html: '<p>Länk tillagd!</p>'})
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