<template>
  <div>
    <!-- page begin -->
    <loading :active.sync="isLoading"></loading>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key" v-if="orders.length" :class="{'text-muted': !item.is_paid}">
          <td>{{ item.create_at | TimeStampFilter }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | CurrencyFilter }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- NOTE: pagination -->
    <Pagination v-if="pagination.total_pages !== 1" :paging="pagination" @triggerPagination="GetOrders"/>


    <!-- page end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      pagination:{},
      orders:[],
    };
  },
  created() {
    this.GetOrders();
  },
  methods: {
    GetOrders(turnToPage = 1) {
      console.log("獲得訂單列表，第幾頁：",turnToPage);
      const api = `${process.env.API_GETORDERS}?page=${turnToPage}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    }
  }
};
</script>