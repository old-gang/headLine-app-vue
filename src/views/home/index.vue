<template>
  <div class="home-container">
    <!-- 搜索 -->
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button class="search-btn" icon="search" type="info" round size="small"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs class="channel-tab" v-model:active="active">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <articleList :channel="item"></articleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { reqUserChannels } from '@/api/user';
  import articleList from './components/article-list.vue';
  // 控制被激活的标签
  const active = ref(0);
  // 用户选择的标签
  const channels = ref([]);

  const getUserChannels = async () => {
    let res = await reqUserChannels();
    channels.value = res.data.channels;
  };

  onMounted(() => {
    getUserChannels();
  });
</script>

<style scoped lang="less">
  .home-container {
    :deep(.van-nav-bar__title) {
      max-width: none;
    }
    .app-nav-bar {
      background-color: #2892ff;
      .search-btn {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: none;
        color: #fff;
        :deep(.van-icon) {
          font-size: 16px;
          color: #fff;
        }
        :deep(.van-button__text) {
          font-size: 14px;
        }
      }
    }
    .channel-tab {
      :deep(.van-tab) {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      :deep(.van-tabs__line) {
        bottom: 20px;
        width: 15px !important;
        height: 3px;
        background-color: #3296fa;
      }
    }
  }
</style>
