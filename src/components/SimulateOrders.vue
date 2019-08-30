<template>
  <div>
    <!-- page begin -->
    <loading :active.sync="isLoading"></loading>

    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">模擬訂單列表</h1>
    </div>

    <div class="row">
      <div v-for="item in products" :key="item.id" class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm">
          <div :style="{backgroundImage:`url(${item.imageUrl})`}" style="height: 150px; background-size: cover; background-position: center"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">{{item.content | currencyFilter}} 元</div> -->
              <del class="h6">原價 {{item.origin_price | currencyFilter}} 元</del>
              <div class="h5">現在只要 {{item.price | currencyFilter}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE: pagination -->
    <Pagination :paging="pagination" @triggerPagination="GetProducts"/>
    <!-- page end -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      isLoading:false,
      pagination:{},
      products:[],

    }
  },
  mounted(){
    this.GetProducts();
  },
  methods:{
    GetProducts(turnToPage=1) {
      console.log("獲得產品列表，第幾頁：",turnToPage);
      const api = `${process.env.API_GETPRODUCTS}?page=${turnToPage}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
  },
}
</script>