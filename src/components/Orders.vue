<template>
  <div>
    <!-- page begin -->
    <loading :active.sync="isLoading"></loading>orders
    <!-- page end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    this.GetOrders();
  },
  methods: {
    GetOrders() {
    }
  }
};
</script>