<template>
  <div class="search-list">
    <van-list
      class="search-list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getSearchResults } from '@/api/search';
  // 接收父组件传递的数据
  const props = defineProps({
    searchText: {
      type: String,
      required: true,
    },
  });
  // 列表
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const page = ref(1);
  const onLoad = async () => {
    try {
      // 请求获取数据
      const res = await getSearchResults({
        page: page.value,
        q: props.searchText,
      });
      const { results } = res.data || [];
      list.value.push(...results);
      loading.value = false;
      if (results.length) {
        page.value++;
      } else {
        finished.value = true;
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style lang="less" scoped></style>
