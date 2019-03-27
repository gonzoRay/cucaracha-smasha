import Game from '@/views/Game';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import SignUp from '@/views/SignUp';
import firebase from 'firebase/app';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('game');
  else next();
});

export default router;
