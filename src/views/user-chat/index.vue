<template>
  <div class="user-chat">
    <!-- 顶部导航栏 -->
    <van-nav-bar class="app-nav-bar" title="小智同学" left-arrow @click-left="router.back()" />
    <!-- 聊天列表 -->
    <van-cell-group class="chat-list" :border="false">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
    <!-- 底部 -->
    <!-- 可以使用 CellGroup 作为容器 -->
    <van-cell-group class="footer">
      <van-field v-model="message" :border="false" placeholder="请输入" />
      <van-button type="primary" size="small" class="send-btn">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  // websocket
  import { io } from 'socket.io-client';
  // 建立链接
  const socket = io('http://toutiao.itheima.net');

  const router = useRouter();
  const message = ref('');
</script>

<style lang="less" scoped>
  .chat-list {
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 14px;
    .send-btn {
      width: 72px;
    }
  }
</style>
