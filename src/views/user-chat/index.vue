<template>
  <div class="user-chat">
    <!-- 顶部导航栏 -->
    <van-nav-bar class="app-nav-bar" title="小智同学" left-arrow @click-left="router.back()" />

    <!-- 聊天主体区域 -->
    <div class="chat-list" ref="messageList">
      <div v-for="(item, index) in messages" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="!item.isMe">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="message" @keyup.enter="sendFn">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { getItem } from '@/utils/storage';
  // websocket
  import { io } from 'socket.io-client';

  const router = useRouter();
  const message = ref('');
  onMounted(() => {
    // 建立链接
    socket.value = io('http://toutiao.itheima.net', {
      query: {
        token: getItem('token'),
      },
      transports: ['websocket'],
    });
    socket.value.on('connect', function () {
      console.log('连接成功');
    });
    // 发送消息
    // socket.emit('')
    // 接收消息
    socket.value.on('message', (message) => {
      // console.log('message', message);
      // 将后端返回的数据添加到消息列表
      messages.value.push(message);
      nextTick(() => {
        toBottom();
      });
    });
  });

  // 消息列表
  let socket = ref(null);
  const messages = ref([{ msg: 'hi，你好！我是小思' }]);
  const messageList = ref();

  // 发送消息
  const sendFn = () => {
    if (!message.value.length) return;
    const data = {
      msg: message.value,
      timestamp: Date.now(),
      isMe: true, // 添加字段，判断是谁发的
    };
    // 发送消息
    socket.value.emit('message', data);
    // 将消息存储到列表
    messages.value.push(data);
    // 清空文本框
    message.value = '';
    nextTick(() => {
      toBottom();
    });
  };
  // 滚动到底部
  const toBottom = () => {
    // 获取dom元素
    let listContainer = messageList.value;
    listContainer.scrollTop = listContainer.scrollHeight;
  };
  // 卸载组件
  onBeforeUnmount(() => {
    // 断开消息
    socket.value.on('disconnect', function () {
      console.log('断开链接');
    });
  });
</script>

<style lang="less" scoped>
  .chat-list {
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-y: auto;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        // 对话框的三角形
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
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
  .chat-item.left {
    // 对话框在左边边
    text-align: left;
    .chat-pao {
      margin-left: 15px;
      margin-right: 0;
      &::before {
        left: -6px;
        transform: rotate(-135deg);
      }
    }
  }
  .chat-item.right {
    // 对话库在右边
    text-align: right;
    .chat-pao {
      margin-left: 0;
      margin-right: 15px;
      background-color: #3296fa;
      &::before {
        right: -6px;
        transform: rotate(45deg);
        background-color: #3296fa;
      }
    }
  }
  .reply-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
  }
</style>
