<template>
  <div>
    <!-- page begin -->
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a @click.prevent="Logout()" class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
    <!-- page end -->
  </div>
</template>

<script>
export default {
  methods: {
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
