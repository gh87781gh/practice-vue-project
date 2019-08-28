<template>
  <div>
    <!-- page begin -->
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">產品列表</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <!-- NOTE call modal -->
        <button @click.prevent="CallModal()" class="btn btn-primary">新增產品</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th width="100">分類</th>
          <th>名稱</th>
          <th width="80">原始價格</th>
          <th width="80">售價</th>
          <th width="80">狀態</th>
          <th width="150">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in products" :key="key">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button @click.prevent class="btn btn-outline-primary">編輯</button>
            <button @click.prevent class="btn btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- NOTE modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModal">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input v-model="tempProduct.imageUrl" type="text" class="form-control" id="image" placeholder="請輸入圖片連結" />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" />
                </div>
                <img :src="tempProduct.imageUrl"
                  class="img-fluid"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input v-model="tempProduct.title" type="text" class="form-control" id="title" placeholder="請輸入標題" />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input v-model="tempProduct.category" type="text" class="form-control" id="category" placeholder="請輸入分類" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input v-model="tempProduct.unit" type="unit" class="form-control" id="unit" placeholder="請輸入單位" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input v-model="tempProduct.origin_price" type="number" class="form-control" id="origin_price" placeholder="請輸入原價" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input v-model="tempProduct.price" type="number" class="form-control" id="price" placeholder="請輸入售價" />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea v-model="tempProduct.description" type="text" class="form-control" id="description" placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea v-model="tempProduct.content" type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input 
                      v-model="tempProduct.is_enabled" 
                      :true-value="1" 
                      :false-value="0" 
                      class="form-check-input" type="checkbox" id="is_enabled" />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button @click.prevent="AddProduct()" type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>-->
    <!-- page end -->
  </div>
</template>

<script>
import $ from 'jquery'; 

export default {
  data() {
    return {
      products: [],
      tempProduct:{
        title:'',
        category:'',
        origin_price:0,
        price:0,
        unit:'',
        image:'',
        description:'',
        content:'',
        is_enabled:0,
        imageUrl:'',
      },
    };
  },
  created() {
    this.GetProducts();
  },
  methods: {
    GetProducts() {
      console.log("獲得產品列表");
      const api = process.env.API_GETPRODUCTS;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    CallModal(){
      $('#productModal').modal('show');
    },
    AddProduct(){
      console.log('建立產品');
      const api = process.env.API_ADDPRODUCTS;
      const vm = this;
      this.$http.post(api,{data:vm.tempProduct}).then(response => {
        console.log(response.data);
        $('#productModal').modal('hide');
        vm.GetProducts();
      });
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
