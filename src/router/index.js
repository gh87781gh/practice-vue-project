import Vue from 'vue';
import Router from 'vue-router';

// 引入頁面元件
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
  ]
})
