import Vue from 'vue';
import Router from 'vue-router';

// 引入頁面元件
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/products';
import Orders from '@/components/Orders';
import Coupons from '@/components/Coupons';
import SimulateOrders from '@/components/SimulateOrders';
import CheckOut from '@/components/CheckOut';


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
      meta: { requiresAuth: true },
      children:[
        {
          path: 'products', //NOTE 子路由路徑不需「/」
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
          meta: { requiresAuth: true }
        },
        {
          path: 'simulate_orders',
          name: 'SimulateOrders',
          component: SimulateOrders,
          meta: { requiresAuth: true }
        },
        {
          path: 'check_out/:id', //動態路由
          name: 'CheckOut',
          component: CheckOut,
          meta: { requiresAuth: true }
        },
      ],
    },
  ]
})
