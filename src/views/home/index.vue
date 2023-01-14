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
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="wap-nav-wrap" @click="handlePopUp">
          <van-icon name="wap-nav" />
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 模板中的$event就是 事件参数-->
    <van-popup
      v-model:show="isChannelEditShow"
      position="bottom"
      closeable
      :style="{ height: '100%' }"
      teleport="body"
      class="channel-edit-popup"
      @close="handleCancel">
      <channel-edit
        :user-channels="channels"
        :active="active"
        @switch="handleSwitch"
        @updataActive="active = $event"></channel-edit>
    </van-popup>
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { reqUserChannels } from '@/api/user';
  import articleList from './components/article-list.vue';
  import channelEdit from './components/channel-edit.vue';
  import { useUserInfoStore } from '@/store/userInfo';
  import { getItem } from '@/utils/storage';
  // 控制被激活的标签
  const active = ref(0);
  // 用户选择的标签
  const channels = ref([]);
  // 弹出层的显示与隐藏
  const isChannelEditShow = ref(false);
  const userInfo = useUserInfoStore();

  const getUserChannels = async () => {
    let channel = [];
    if (userInfo.user) {
      // 已登录，获取数据库数据
      let res = await reqUserChannels();
      channel = res.data.channels;
    } else {
      // 未登录
      let localChannels = getItem('user-channels');
      if (localChannels) {
        channel = localChannels;
      } else {
        // 未登录，且没有本地存储，那就请求默认推荐的频道列表
        let res = await reqUserChannels();
        channel = res.data.channels;
      }
    }
    channels.value = channel;
  };

  // 弹出层
  const handlePopUp = () => {
    isChannelEditShow.value = true;
  };

  const handleCancel = () => {
    isChannelEditShow.value = false;
  };
  const handleSwitch = (val) => {
    isChannelEditShow.value = val;
  };
  // const onUpdataActive = (val) => {
  //   active.value = val;
  // };
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
        color: #777;
      }
      :deep(.van-tabs__line) {
        bottom: 8px;
        width: 31px !important;
        height: 3px;
        background-color: #3296fa;
      }
      :deep(.van-tab--active) {
        color: #333;
      }
      :deep(.van-tabs__nav) {
        padding-bottom: 0;
      }
      .wap-nav-wrap {
        position: fixed;
        width: 33px;
        height: 43px;
        right: 0;
        background-color: #fff;
        opacity: 0.9;
        font-size: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          content: '';
          width: 1px;
          height: 30px;
          background: linear-gradient(white, black, white);
        }
      }
      .placeholder {
        width: 33px;
        height: 43px;
        flex-shrink: 0;
      }
    }
  }
</style>
