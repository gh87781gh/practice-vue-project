<template>
  <div>
    <!-- page begin -->
    <loading :active.sync="isLoading"></loading>

    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">結帳確認</h1>
    </div>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="PayOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currencyFilter}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total | currencyFilter}}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>

    <!-- page end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: "",
      order:{
        is_paid:false,
        user:{},
      },
    };
  },
  created() {
    this.orderId = this.$route.params.id;
    this.GetOrder();
  },
  methods: {
    GetOrder() {
      console.log("取得訂單");
      const vm = this;
      const api = `${process.env.API_USERORDER}/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    PayOrder() {
      console.log("結帳付款去");
      const vm = this;
      const api = `${process.env.API_USERPAY}/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if(response.data.success){
          vm.order.is_paid = true;
          vm.isLoading = false;
        }
      });
    },
  }
};
</script>