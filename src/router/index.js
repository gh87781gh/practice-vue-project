import Vue from 'vue';
import Router from 'vue-router';

// 引入頁面元件
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/products';


Vue.use(Router);

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '*',
      redirect: '/login' //NOTE 所有非設定路由都重新導向至登入頁
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: '',
      component: Dashboard,
      children:[
        {
          path: '', //NOTE 子路由路徑不需「/」
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        },
      ],
    },
  ]
})
