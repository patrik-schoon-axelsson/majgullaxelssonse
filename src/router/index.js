import store from './../store';
import { createRouter, createWebHashHistory } from 'vue-router';
import Vue404 from '../views/Vue404.vue';
import Home from '../views/Home.vue';
import Books from '../views/Books.vue';
import M from 'materialize-css';

M.AutoInit();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
       path: '/news',
       name: 'news_archive',
       component:  () => import('../views/Archive.vue')
      }
    ]
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
    },
  {
    path: 'add-booktip',
    name: 'add-booktip',
    components: {
      default: () => import('../views/Dashboard.vue'),
      toolbox: () => import('../views/DashboardViews/AddBookTipForm.vue') 
    }
  }]
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: Vue404
    }
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, __, next) => {

if(to.meta.reqAuth && !store.getters.isLoggedIn){
    next('/auth')
    M.toast({html: `<strong>Du har nekats tillg??ng till denna del av sidan. V??nligen logga in p?? nytt! </strong`});
  } else next();
});

export default router
