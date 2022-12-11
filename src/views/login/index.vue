<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar" title="登录 / 注册" left-arrow @click-left="onClickLeft" />

    <!-- 登录表单 -->
    <!-- 表格的inset属性可以将单元格转换为圆角卡片风格 -->
    <van-form
      :show-error-message="false"
      :validate-first="true"
      ref="loginRef"
      @submit="onLogin"
      @failed="onFailed">
      <van-field
        class="mobile"
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile" />
      <van-field
        class="code"
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code">
        <!-- 发送验证码按钮 -->
        <template #button>
          <van-count-down
            v-if="isDownShow"
            :time="1000 * 6"
            format="ss s"
            class="count-down"
            @finish="isDownShow = false" />
          <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="primary" native-type="submit" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  };
</script>
<script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  // 请求函数
  import { login, sendSms } from '@/api/user';
  import { Toast } from 'vant';
  import { useUserInfoStore } from '@/store/userInfo';
  // 获取路由器
  const router = useRouter();
  // 获取仓库
  const userInfoStore = useUserInfoStore()
  // 收集用户信息
  const user = reactive({
    mobile: '17812085173', //17090086870
    code: '246810', //246810
  });
  // 倒计时按钮的显示与隐藏
  const isDownShow = ref(false);
  const isSendSmsLoading = ref(false);
  // 返回上一页
  const onClickLeft = () => {
    router.back();
  };
  // 获取表单实例
  const loginRef = ref();
  // 登录
  // 表单校验规则
  const formRules = reactive({
    mobile: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
    ],
    code: [
      { required: true, message: '请输入验证码' },
      { pattern: /\d{6}/, message: '验证码格式错误' },
    ],
  });
  // 登录按钮
  const onLogin = async () => {
    Toast.loading({
      message: '登录中……', //提示文字
      forbidClick: true, //禁止背景点击
      duration: 0, //持续时长
    });
    // 17090086870   246810
    // 13911111111   246810
    try {
      let { data } = await login(user);
      Toast.success('登录成功');
      // 提交仓库，存储token
      userInfoStore.user( data.data);
    } catch (error) {
      Toast.fail('登录失败，手机号或验证码错误');
    }
  };
  // 表单校验失败
  const onFailed = (error) => {
    if (error.errors[0]) {
      Toast({
        message: error.errors[0].message,
        position: 'top', //防止手机键盘太高看不见提示信息
      });
    }
  };
  // 发送验证码
  const onSendSms = async () => {
    try {
      // 此方法只验证手机号，返回一个promise
      await loginRef.value.validate('mobile');
      // 添加loading是为了防止用户多次点击行为
      isSendSmsLoading.value = true;
      // 发送验证码
      await sendSms(user.mobile);
      // 打开倒计时
      isDownShow.value = true;
    } catch (error) {
      // try里面任何代码的错误都会进入catch
      let message = '';
      if (error && error.response && error.response.status === 429) {
        message = '发送太频繁，请稍后重试';
      } else if (error.name === 'mobile') {
        message = error.message;
      } else {
        // 未知错误
        message = '发送失败';
      }
      // 提示信息
      Toast({
        message,
        position: 'top',
      });
    }
    isSendSmsLoading.value = false;
  };
</script>

<style scoped lang="less">
  .login-container {
    .code,
    .mobile {
      height: 50px;
    }
    .send-btn {
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button__text {
        font-size: 11px;
        color: #666;
      }
    }
    .count-down {
      width: 76px;
      height: 23px;
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
