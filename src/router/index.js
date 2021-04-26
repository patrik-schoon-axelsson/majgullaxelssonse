import store from './../store';
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Books from '../views/Books.vue';
import firebase from 'firebase';
import M from 'materialize-css';

M.AutoInit();

function getUser() {
  return firebase.auth.currentUser;
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    children: [{
      path: '',
      name: 'bookview_home',
      components: {
        default: Books,
        books: () => import('../views/BookViews/BookViewHome.vue')
        }
      },
      {
      path: ':id/details',
      name: 'bookview_details',
      components: {
         default: () => import('../views/Books.vue'),
         books: () => import('../views/BookViews/BookView.vue')   
        }
    }]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { reqAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHomeView',
        components: {
          default: () => import('../views/Dashboard.vue'),
          toolbox: () => import('../views/DashboardViews/DashboardHomeView.vue')}
      },
      {
      path: 'add-news/',
      name: 'add-news',
      components: {
        default: () => import('../views/Dashboard.vue'),
        toolbox: () => import('../views/DashboardViews/AddNews.vue')}
      }, 
      {
        path: 'add-books/',
        name: 'add-books',
        components: {
          default: () => import('../views/Dashboard.vue'),
          toolbox: () => import('../views/DashboardViews/AddBook.vue')}
      },
      {
        path: 'add-links/',
        name: 'add-links',
        components: {
          default: () => import('../views/Dashboard.vue'),
          toolbox: () => import('../views/DashboardViews/AddAboutLink.vue')          
        }
    }]
    }
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, __, next) => {

if(to.meta.reqAuth && !store.getters.isLoggedIn){
    next('/auth')
    M.toast({html: `<strong>Du har nekats tillgång till denna del av sidan. Vänligen logga in på nytt! </strong`});
  } else  next();
});

export default router
