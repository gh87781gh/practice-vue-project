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
            <button @click="AddToCart(item.id)" type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i v-if="status.loadingAddToCart === item.id" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE: pagination -->
    <Pagination :paging="pagination" @triggerPagination="GetProducts"/>

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 mt-5 border-bottom">
      <h1 class="h2">模擬購物車列表</h1>
    </div>

    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button @click="DelCart(item.id)" type="button" class="btn btn-outline-danger btn-sm">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.total | currencyFilter }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.priceTotal | currencyFilter}}</td>
            </tr>
            <tr v-if="cart.priceTotalFinal !== cart.priceTotal">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.priceTotalFinal | currencyFilter}}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button @click="UseCoupon" class="btn btn-outline-secondary" type="button">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE: form -->
    <ValidationObserver v-slot="{ invalid, passes }">
      <div class="my-5 row justify-content-center">
        <form @submit.prevent="passes(CreatOrder)" class="col-md-6">
          <div class="form-group">
            <label for="useremail">Email</label>
            <ValidationProvider rules="required|email" v-slot="{ errors }" name="email">
              <input v-model="form.user.email" :class="{'is-invalid':errors.length > 0}" class="form-control" type="text" placeholder="請輸入 Email">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="useremail">收件人姓名</label>
            <ValidationProvider rules="required" v-slot="{ errors }" name="姓名">
              <input v-model="form.user.name" :class="{'is-invalid':errors.length > 0}" class="form-control" type="text" placeholder="請輸入 姓名">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="useremail">收件人電話</label>
            <ValidationProvider rules="required|numeric" v-slot="{ errors }" name="電話">
              <input v-model="form.user.tel" :class="{'is-invalid':errors.length > 0}" class="form-control" type="text" placeholder="請輸入 電話">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="useremail">收件人地址</label>
            <ValidationProvider rules="required" v-slot="{ errors }" name="地址">
              <input v-model="form.user.address" :class="{'is-invalid':errors.length > 0}" class="form-control" type="text" placeholder="請輸入 地址">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button :disabled="invalid" class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </ValidationObserver>

    <!-- NOTE modal -->
    <div class="modal fade" id="productDetailModal" tabindex="-1" role="dialog"
      aria-labelledby="productDetailModal" aria-hidden="false">
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
            <button @click="AddToCart(productDetail.id,productDetail.num)" type="button" class="btn btn-primary">
              <i class="fas fa-spinner fa-spin" v-if="productDetail.id === status.loadingAddToCart"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    
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
      },
      cart:{
        carts:[],
        priceTotal:0,
        priceTotalFinal:0
      },
      couponCode:'',
      form:{
        user:{
          name: '',
          email: '',
          tel: '',
          address:'' 
        },
        message: ''
      },
    }
  },
  mounted(){
    this.GetProducts();
    this.GetCarts();
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
    AddToCart(id,qty = 1){
      console.log('加到購物車',id,qty);
      const api = process.env.API_USERCART;
      const vm = this;
      const data = {
        data:{
          product_id:id,
          qty
        }
      }
      vm.status.loadingAddToCart = id;
      this.$http.post(api,data).then(response => {
        console.log(response.data);
        vm.status.loadingAddToCart = '';
        vm.GetCarts();
        $('#productDetailModal').modal('hide');
      });
    },
    GetCarts(){
      console.log("獲得購物車列表");
      const api = process.env.API_USERCART;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        console.log(response.data.data.carts);
        vm.cart.carts = response.data.data.carts;
        vm.cart.priceTotal = response.data.data.total;
        vm.cart.priceTotalFinal = response.data.data.final_total;
        vm.isLoading = false;
      });
    },
    DelCart(id){
      console.log("刪除購物車該筆資料",id);
      const api = `${process.env.API_USERCART}/${id}`;
      const vm = this;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if(response.data.success){
          vm.GetCarts();
        }
      });
    },
    UseCoupon(){
      console.log('套用優惠券');
      const api = process.env.API_USERCARTUSECOUPON;
      const vm = this;
      const coupon = {
        code:vm.couponCode
      }
      this.$http.post(api,{data:coupon}).then(response => {
        console.log(response.data);
        if(response.data.success){
          vm.cart.priceTotalFinal = response.data.data.final_total;
        }
      });
    },
    CreatOrder() {
      console.log("建立訂單");
      // No need to worry about form state
      // as this is only runs when the form is valid
      // 🐿 ship it
      const api = process.env.API_USERORDER;
      const vm = this;
      this.$http.post(api,{data:vm.form}).then(response => {
        console.log(response.data);
        console.log(response.data.orderId);
        if(response.data.success){
          vm.$router.push(`/dashboard/check_out/${response.data.orderId}`);
        }
      });
    },
  },
}
</script>