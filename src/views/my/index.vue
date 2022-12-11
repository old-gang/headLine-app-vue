<template>
  <div class="my-container">
    <van-cell-group class="my-info">
      <van-cell center :border="false" class="base-info">
        <template #icon>
          <van-image
            class="avator"
            round
            fit="cover"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </template>
        <template #title>
          <div class="name">昵称</div>
        </template>
        <template #value>
          <van-button class="update-btn" size="small" round> 编辑资料 </van-button>
        </template>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">123</div>
            <div class="text">头条</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">123</div>
            <div class="text">关注</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">12344</div>
            <div class="text">粉44丝</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">123</div>
            <div class="text">获赞</div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell v-if="store.token" class="logout" title="退出登录" />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useUserInfoStore } from '@/store/userInfo';

  const store = useUserInfoStore();
</script>

<style lang="less" scoped>
  .my-container {
    .my-info {
      background-color: skyblue;
      .base-info {
        background-color: unset;
        height: 115px;
        box-sizing: border-box;
        padding: 38px auto 11px;
        .avator {
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          box-sizing: border-box;
          margin-right: 10px;
        }
        .name {
          color: #fff;
          font-size: 15px;
        }
        .update-btn {
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      }
      .data-info {
        .data-info-item {
          height: 65px;
          color: #fff;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
      :deep(.van-grid-item__content) {
        background-color: unset;
      }
    }
    :deep(.nav-grid) {
      .nav-grid-item {
        height: 70px;
      }
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
    .logout {
      text-align: center;
      color: #d86262;
    }
    .mb-4 {
      margin-bottom: 4px;
    }
  }
</style>
