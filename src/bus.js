// NOTE 把 event.bus 直接掛載在 Vue 的原型下，就可以直接對 bus 做呼叫
// 記得把這個檔案注入到 main.js 內！

import Vue from 'vue';

Vue.prototype.$bus = new Vue();

/*  紀錄已註冊使用的 event.bus 自定義事件，以下為:

1. 外層元件名稱：Alertmessage.vue
2. 外層自定義註冊事件名稱：'message:push'
3. 內層觸發指令：this.$bus.$emit('message:push' , message , status);
4. 參數說明：
message:string
status:string (className 「alert-'status'」in bootstrap)


1. 外層元件名稱：
2. 外層自定義註冊事件名稱：
3. 內層觸發指令：
4. 參數說明：

*/