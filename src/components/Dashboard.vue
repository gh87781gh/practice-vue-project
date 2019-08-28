<template>
  <div>
    <!-- page begin -->
    <Navbar/>

    <div class="container-fluid">
      <div class="row">
        <Sidebar/>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <!-- NOTE content start -->
          
          <!-- content end -->
        </main>
      </div>
    </div>
    <!-- page end -->
  </div>
</template>

<script>
import Navbar from './lib/Navbar';
import Sidebar from './lib/Sidebar';

export default {
  components:{
    Navbar,
    Sidebar,
  },
  methods: {
    Logout() {
      console.log("執行登出");
      const api = `${process.env.API_LOGOUT}`;
      const vm = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        // 登出成功即跳至登入頁
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
