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
        <button @click.prevent="CallModal('new',null)" class="btn btn-secondary">新增優惠券</button>
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
          <td>{{item.due_date | TimeStampFilter}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button @click.prevent="CallModal('edit',item)" class="btn btn-outline-primary">編輯</button>
            <button @click.prevent="CallModal('del',item)" class="btn btn-outline-danger">刪除</button>
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
                  <label for="title">到期日</label> <small class="text-muted">至當天晚上 23:59 為止</small>
                  <input type="text" class="form-control" id="couponDeadLine" placeholder="" autocomplete="off"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title">折扣百分比</label>
                  <input v-model.number="tempCoupon.percent" type="number" class="form-control" id="title" placeholder="100" />
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
            <button @click.prevent="SendCoupon" type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delCouponModal">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button @click.prevent="DelCoupon" type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE: pagination -->
    <Pagination :paging="pagination" @triggerPagination="GetCoupons"/>

    <!-- page end -->
  </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap-datepicker';

export default {
  data() {
    return {
      isLoading: false,
      pagination:{},
      callModalKind: '', // new, edit, del
      openModalText: '',
      coupons: [
        // {
        //   due_date: 1555459200,
        //   id: "-L9u5Cgodczattv-7i8D",
        //   is_enabled: 1,
        //   percent: 70,
        //   title: "超級特惠價格2"
        // }
      ],
      tempCoupon:{
        title: '',
        due_date: 0,
        is_enabled: 0,
        percent: 100,
        code:'',
      },
      datepicker:{
        year: 0,
        month: 0,
        day: 0,
        hour: 23, // 系統預設截止時間為當天的晚上 23:59
        min: 59,
      },
    };
  },
  mounted(){
    const vm = this;
    vm.GetCoupons();
    $('#couponDeadLine').datepicker({
      format: 'yyyy/mm/dd',
      startDate: '0',
      autoclose:true,
    }).on('changeDate', function() {
      console.log('選取時間',this.value);
      // 透過 bootstrap-datepicker 選擇的日期
      let ary = this.value.split('/');
      [vm.datepicker.year,vm.datepicker.month,vm.datepicker.day] = ary;
      const monthTrans = {
        num:[1,2,3,4,5,6,7,8,9,10,11,12],
        str:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      }
      monthTrans.num.find((item,index) => {
        if(item === Number(vm.datepicker.month)){
          vm.datepicker.month = monthTrans.str[index]
        }
      });
      let timeStr = `${vm.datepicker.month} ${vm.datepicker.day} ${vm.datepicker.year} ${vm.datepicker.hour}:${vm.datepicker.min}:00 GMT+0800`; // GMT+0800 台北標準時間
      let timeStamp = Math.floor(Date.parse(timeStr)/1000);
      // 在這裡執行第一次沒問題，但第 2 次開始會出現無法正常寫入，所以拉出去用一個 method 事件，讓它在整個 Modal 資料要送出實再存進 data
      vm.tempCoupon.due_date = timeStamp;
    });
  },
  methods: {
    GetCoupons(turnToPage=1) {
      console.log("獲得優惠券列表");
      const api = `${process.env.API_GETCOUPONS}?page=${turnToPage}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    CallModal(kind, item) {
      console.log("要執行的動作類型：", kind, "帶入的這筆產品資料：", item);
      const vm = this;
      if(kind === 'del'){
        vm.tempCoupon = Object.assign({},item);
        $("#delCouponModal").modal("show");
        return;
      }

      if(kind === 'new'){
        vm.callModalKind = 'new';
        vm.openModalText = '新增優惠券';
        vm.tempCoupon = {};
      }else if(kind === 'edit'){
        vm.callModalKind = 'edit';
        vm.openModalText = '修改優惠券';
        vm.tempCoupon = Object.assign({},item);

        // 把該 item 的 due_date 轉成 Date，再印入該 input 內
        let date = new Date(item.due_date*1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1; // month 是從 0 開始算起
        let day = date.getDate();
        let timeStr = `${year}/${month}/${day}`;
        $('#couponDeadLine').datepicker('update',timeStr);
      }
      $("#couponModal").modal("show");
    },
    SendCoupon(){
      const vm = this;
      let api,action,data;

      if(vm.callModalKind === 'new'){
        // console.log('新增')
        api = process.env.API_COUPON;
        action = 'post';
        data = {data:vm.tempCoupon};
      }else if(vm.callModalKind === 'edit'){
        // console.log('編輯')
        api = `${process.env.API_COUPON}/${vm.tempCoupon.id}`;
        action = 'put';
        data = {data:{
          title:vm.tempCoupon.title,
          due_date:vm.tempCoupon.due_date,
          is_enabled:vm.tempCoupon.is_enabled,
          percent:vm.tempCoupon.percent,
        }};
      }
      vm.isLoading = true;
      this.$http[action](api,data).then(response => {
        console.log(response.data);
        // vm.pagination = response.data.pagination;
        vm.isLoading = false;
        vm.GetCoupons();
        $('#couponModal').modal('hide');
      });
    },
    DelCoupon(){
      console.log('刪除優惠券');
      const vm = this;
      const api = `${process.env.API_COUPON}/${vm.tempCoupon.id}`;  
      this.$http.delete(api).then(response => {
        console.log(response.data);
        $('#delCouponModal').modal('hide');
        vm.GetCoupons();
      });
    },
  },
};
</script>

<style scope>
@import '@/../bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
</style>