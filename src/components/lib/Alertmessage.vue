<template>
  <div class="message-alert">
    <div
      v-for="(item,index) in messages"
      :class="'alert-'+item.status"
      :key="index"
      class="alert alert-dismissible"
    >
      {{item.message}}
      <button
        @click="removeMessage(index)"
        type="button"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        // {
        //   message: "訊息內容",
        //   status: "danger",
        //   timestamp: 0
        // }
      ]
    };
  },
  methods: {
    UpdateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.RemoveMessageWithTiming(timestamp);
    },
    RemoveMessage(index) {
      this.messages.splice(index, 1);
    },
    RemoveMessageWithTiming(timestamp) {
      //NOTE:外面傳進來的訊息才會被移除，手動輸入的訊息不會
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(index, 1);
          }
        });
      }, 5000);
    }
  },
  created() {
    const vm = this;

    // 自定義註冊的事件名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // NOTE:這裡外層用 on 註冊，到時候內層（其他元件內的 methods）用 emit 去觸發外層的事件
    // vm.$bus.$on('註冊的事件名稱',(參數)=>{...})
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.UpdateMessage(message, status);
    });
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>