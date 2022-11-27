<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 登录表单 -->
    <!-- 表格的inset属性可以将单元格转换为圆角卡片风格 -->
    <van-cell-group>
      <van-field
        v-model="user.phone"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <!-- 发送验证码按钮 -->
        <template #button>
          <van-button class="send-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="primary" block>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
// 获取路由器
const router = useRouter();
// 收集用户信息
const user = reactive({
  phone: "",
  code: "",
});
// 返回上一页
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
