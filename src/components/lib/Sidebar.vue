<template>
  <div>
    <!-- page begin -->
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員功能</span>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/dashboard/products">
              <i class="fas fa-archive mr-1"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/dashboard/orders">
              <i class="fas fa-clipboard-list mr-1"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/dashboard/coupons">
              <i class="fas fa-ticket-alt mr-1"></i>
              優惠券
            </router-link>
          </li>
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/dashboard/simulate_orders">
              <i class="fas fa-archive mr-1"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>

        <!-- <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>Saved reports</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>-->
      </div>
    </nav>
    <!-- page end -->
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
