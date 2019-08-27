<template>
  <div>
    <button @click="Logout()">登出</button>
  </div>
</template>

<script>
export default {
  methods:{
    Logout(){
      console.log('執行登出');
      const api = `${process.env.API_LOGOUT}`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        // 登出成功即跳至登入頁
        if (response.data.success) {
          vm.$router.push('/login');
        };
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
