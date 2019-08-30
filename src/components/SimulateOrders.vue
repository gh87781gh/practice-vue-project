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
            <button @click="GetProductDetail(item.id)" type="button" class="btn btn-outline-secondary btn-sm">
              <i v-if="status.loadingProductDetail === item.id" class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i v-if="status.loadingAddToCart === item.id" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE modal -->
    <div class="modal fade" id="productDetailModal" tabindex="-1" role="dialog"
      aria-labelledby="productDetailModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productDetailModal">{{ productDetail.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="productDetail.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ productDetail.content }}</p>
              <footer class="blockquote-footer text-right">{{ productDetail.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h4" v-if="!productDetail.price">{{ productDetail.origin_price }} 元</div> -->
              <del class="h6" v-if="productDetail.price">原價 {{ productDetail.origin_price }} 元</del>
              <div class="h4" v-if="productDetail.price">現在只要 {{ productDetail.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="productDetail.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{productDetail.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ productDetail.num * productDetail.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary">
              <i class="fas fa-spinner fa-spin" v-if="productDetail.id === status.loadingAddToCart"></i>
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
import $ from 'jquery';

export default {
  data(){
    return{
      isLoading:false,
      pagination:{},
      products:[],
      productDetail:{},
      status:{
        loadingProductDetail:'',//當下選到的產品細節
        loadingAddToCart:'',//當下選到的產品加入購物車
      }
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
    GetProductDetail(itemId){
      console.log("獲得產品細節資訊");
      const api = `${process.env.API_USERPRODUCT}/${itemId}`;
      const vm = this;
      vm.status.loadingProductDetail = itemId;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.productDetail = response.data.product;
        $('#productDetailModal').modal('show');
        vm.status.loadingProductDetail = '';
      });
    },
  },
}
</script>