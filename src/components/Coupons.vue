<template>
  <div>
    <!-- page begin -->
    <loading :active.sync="isLoading"></loading>

    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">優惠券列表</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <!-- NOTE call modal -->
        <button @click.prevent="CallModal('new',null)" class="btn btn-primary">新增優惠券</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- NOTE modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModal">
              <span>{{openModalText}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input v-model="tempCoupon.title" type="text" class="form-control" id="title" placeholder="請輸入標題" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title">優惠碼</label>
                  <input v-model="tempCoupon.code" type="text" class="form-control" id="title" placeholder="請輸入優惠碼" />
                </div>
              </div>
              <div class="col-md-6">
                <!-- TODO datepicker -->
                <div class="form-group">
                  <label for="title">到期日</label>
                  <input v-model="tempCoupon.due_date" type="text" class="form-control" id="title" placeholder="" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title">折扣百分比</label>
                  <input v-model.number="tempCoupon.percent" type="text" class="form-control" id="title" placeholder="100" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="form-check">
                    <input 
                      v-model="tempCoupon.is_enabled" 
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
            <button @click.prevent="SendCoupon()" type="button" class="btn btn-primary">確認</button>
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
  data() {
    return {
      isLoading: false,
      callModalKind: "", // new, edit
      openModalText: "",
      coupons: [
        {
          due_date: 1555459200,
          id: "-L9u5Cgodczattv-7i8D",
          is_enabled: 1,
          percent: 70,
          title: "超級特惠價格2"
        },
        {
          due_date: 6547658,
          is_enabled: 1,
          percent: 80,
          title: "超級特惠價格"
        }
      ],
      tempCoupon:{
        title: '',
        due_date: 0,
        is_enabled: 0,
        percent: 100,
        code:'',
      },
    };
  },
  created() {
    this.GetCoupons();
  },
  methods: {
    GetCoupons() {
      console.log("獲得優惠券列表");
    },
    CallModal(kind, item) {
      console.log("要執行的動作類型：", kind, "帶入的這筆產品資料：", item);
      const vm = this;
      vm.openModalText = '新增優惠券'
      $("#couponModal").modal("show");
    }
  }
};
</script>