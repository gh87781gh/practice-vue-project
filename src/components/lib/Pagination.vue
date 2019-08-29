<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li :class="{'disabled':!paging.has_pre}" 
            class="page-item">
          <a @click.prevent="Pagination(paging.current_page - 1)"
              class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="(page) in paging.total_pages" :key="page" 
            :class="{'active':page === paging.current_page}"
            class="page-item">
          <a  @click.prevent="Pagination(page)"
              class="page-link" href="#">{{page}}</a>
        </li>
        <li :class="{'disabled':!paging.has_next}" 
            class="page-item">
          <a @click.prevent="Pagination(paging.current_page + 1)"
              class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["paging"],
  data(){
    return{
      page:1 // 進來後的預設頁面為第 1 頁
    }
  },
  methods:{
    Pagination(pageNum){
      const vm = this;
      vm.page = pageNum;
      console.log('進行翻頁，翻頁至：',vm.page);
      vm.$emit('triggerPagination',vm.page);
    },
  },
};
</script>