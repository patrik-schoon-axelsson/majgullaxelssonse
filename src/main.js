import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'animate.css/animate.min.css';
import { createApp } from 'vue';
import firebase from 'firebase';
import firebaseApp from './firebaseApp.js';
import App from './App.vue';
import BaseCategoryButton from './components/ui/base/BaseCategoryButton.vue';
import BaseNavbar from './components/ui/base/BaseNavbar.vue';
import BaseFooter from './components/ui/base/BaseFooter.vue'
import BaseDeleteButton from './components/auth/BaseDeleteButton.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('BaseFooter', BaseFooter);
app.component('BaseNavbar', BaseNavbar);
app.component('BaseDeleteButton', BaseDeleteButton);
app.component('BaseCategoryButton', BaseCategoryButton);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userStore = {
      id: user.getIdToken(),
      email: user.email,
      displayName: user.displayName,
    }
    store.commit('setUser', userStore);    
    
  } else  {
    // Clearing user in the store, just to make sure.
    store.state.user = null;
  }
});

app.mount('#app');