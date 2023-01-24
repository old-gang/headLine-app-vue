<template>
  <div class="search-suggestions">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="emit('search', text)">
      <template #title>
        <div v-html="heightLight(text)"> </div>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { getSearchSuggests } from '@/api/search';
  import { Toast } from 'vant';
  import { debounce, cloneDeep } from 'lodash';
  // 接收父组件传递的数据
  const props = defineProps({
    searchText: {
      type: String,
      required: true,
    },
  });
  // 自定义事件
  const emit = defineEmits(['search']);
  // 搜索建议
  const suggestions = ref([]);
  // 防抖优化
  const searchSuggestions = debounce(async (q) => {
    try {
      let res = await getSearchSuggests(q);
      if (!(res.data.options[0] === null)) {
        suggestions.value = res.data.options;
      }
    } catch (error) {
      Toast(error);
    }
  }, 500);
  // 搜索关键字高亮
  const heightLight = (text) => {
    if (text && text.length) {
      const heightStr = `<span class='active'>${props.searchText}</span>`;
      const reg = new RegExp(props.searchText, 'gi');
      return text.replace(reg, heightStr);
    }
  };
  // 监听父组件传递过来的数据的变化
  watch(
    () => props.searchText,
    (val) => {
      searchSuggestions(val);
    },
    { immediate: true },
  );
</script>

<style lang="less" scoped>
  .search-suggestions {
    :deep(span.active) {
      color: #3296fa;
    }
  }
</style>
