<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
        <article-item v-for="(article, index) in articles" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { reqGetArticles } from '@/api/article';
  import ArticleItem from '@/components/article-item';
  // 列表组件
  const articles = ref([]); //数据列表
  const loading = ref(false); //控制加载中的loading状态
  const finished = ref(false); // 控制加载结束的状态，当加载结束时，不再出发加载更多
  const timestamp = ref(null);
  const onLoad = async () => {
    // 请求获取数据
    let res = await reqGetArticles({
      channel_id: props.channel?.id, //频道ID
      timestamp: timestamp.value || Date.now(), //时间戳,请求新的推荐数据，使用当前的时间戳，请求历史推荐传指定的时间戳
      with_top: 1, //是否包含置顶文章，1包含置顶，0不包含
    });
    // 将数据放到article数组中
    const { results } = res.data;
    // 注意是合并后放的 不是直接覆盖
    articles.value.push(...results);
    // 设置本次加载状态结束
    loading.value = false;
    // 数据全部加载完成
    // 注意修改时间戳
    if (results.length) {
      // 修改时间戳
      timestamp.value = res.data.pre_timestamp;
    } else {
      // 没有数据了
      finished.value = true;
    }
  };

  // 下拉刷新列表
  const refreshLoading = ref(false);
  const refreshSuccessText = ref('');
  const onRefresh = async () => {
    let res = await reqGetArticles({
      channel_id: props.channel?.id, //频道ID
      timestamp: Date.now(),
      with_top: 1, //是否包含置顶文章，1包含置顶，0不包含
    });
    // 将新数据追加到最上面
    const { results } = res.data;
    articles.value.unshift(...results);
    // 关闭刷新状态
    refreshLoading.value = false;
    refreshSuccessText.value = `更新了${results.length}条数据`;
  };

  // 接收父组件传递的信息
  const props = defineProps(['channel']);
</script>

<style scoped lang="less">
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
