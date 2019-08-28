// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 外部套件
import Vue from 'vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';

// 自定義
import App from './App';

Vue.config.productionTip = false;
// 啟用套件
Vue.use(VueAxios, axios);
// 登入驗證附帶 Cookies 設定
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});

// router 全局導航守衛
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);

  // 需有登入狀態才能進入的頁面
  if (to.meta.requiresAuth) {
    console.log('這頁需要登入狀態,執行確認登入狀態');
    const api = `${process.env.API_CHECKAUTH}`;
    const vm = this;
    // NOTE:注意！在 router 下，並不是在 vue 的元件內，這邊不能使用「this.$http」，而是要直接使用「axios」！
    axios.post(api).then(response => {
      console.log('確認登入狀態：',response.data);
      if(response.data.success){
        //是登入狀態，就正常進入該頁
        next();
      }else{
        //非登入狀態，跳回登入頁面重新登入
        next('/login');
        alert('請先登入');
      }
    });
  }else{
    next();
  }
})
