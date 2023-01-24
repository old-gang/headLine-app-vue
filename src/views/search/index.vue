<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @update:model-value="isSearchResult = false"
        @search="onSearch"
        @cancel="onCancel" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isSearchResult" :searchText="searchText"></search-result>
    <!-- 搜索建议 -->
    <seatch-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"></seatch-suggestion>
    <!-- 搜索历史 -->
    <search-history v-else></search-history>
  </div>
</template>

<script setup>
  import { nextTick, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import searchHistory from './components/search-history.vue';
  import searchResult from './components/search-result.vue';
  import seatchSuggestion from './components/seatch-suggestion.vue';
  const router = useRouter();
  // 搜索的关键字
  const searchText = ref('');
  // 搜索
  const onSearch = (val) => {
    searchText.value = val;
    isSearchResult.value = true;
  };
  // 取消
  const onCancel = () => {
    searchText.value = '';
    router.back();
  };

  // 搜索
  const isSearchResult = ref(false);
</script>

<style scoped lang="less">
  .search-container {
    :deep(.van-search__action) {
      color: #fff;
    }
  }
</style>
