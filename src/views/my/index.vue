<template>
  <div class="my-container">
    <van-cell-group v-if="store.user" class="my-info">
      <van-cell center :border="false" class="base-info">
        <template #icon>
          <van-image class="avator" round fit="cover" :src="user.photo" />
        </template>
        <template #title>
          <div class="name">{{ user.name }}</div>
        </template>
        <template #value>
          <van-button class="update-btn" size="small" round to="/user/profile">
            编辑资料
          </van-button>
        </template>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ user.art_count }}</div>
            <div class="text">头条</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ user.follow_count }}</div>
            <div class="text">关注</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ user.fans_count }}</div>
            <div class="text">粉丝</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ user.like_count }}</div>
            <div class="text">获赞</div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div class="mobile" @click="router.push('/login')">
        <img src="../../assets/images/default-avatar.png" />
      </div>
      <div class="text"> 登录 / 注册 </div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/user/chat" />
    <van-cell v-if="store.user" class="logout" title="退出登录" @click="onLogout" />
    <van-dialog
      v-model:show="show"
      title="退出提示"
      message="确认退出吗？"
      show-cancel-button
      @confirm="handlerLogout"></van-dialog>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, reactive } from 'vue';
  import { useUserInfoStore } from '@/store/userInfo';
  import { useRouter } from 'vue-router';
  import { currentUser } from '@/api/user';

  const router = useRouter();
  const store = useUserInfoStore();
  // 退出弹窗
  const show = ref(false);
  // 当前登录用户的信息
  const user = ref({});

  // 退出登录
  const onLogout = () => {
    show.value = true;
  };
  // 确认对话框的回调
  const handlerLogout = () => {
    // 清空用户的登录状态
    store.USER(null);
  };

  // 获取当前用户信息
  const getCurrentUser = async () => {
    let res = await currentUser();
    user.value = res.data;
  };

  onMounted(() => {
    // 获取当前用户信息
    getCurrentUser();
  });
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
    .not-login {
      height: 180px;
      background-color: skyblue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile {
        width: 66px;
        height: 66px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        font-size: 14px;
        color: #fff;
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
