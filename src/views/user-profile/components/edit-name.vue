<template>
  <div class="edit-name">
    <van-nav-bar
      title="修改名称"
      left-text="取消"
      right-text="确定"
      @click-left="handleCancle"
      @click-right="onComfirm" />
    <div class="name-wrap" style="margin-top: 10px">
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入名称"
          show-word-limit />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { updateUserProfile } from '@/api/user';
  import { Toast } from 'vant';

  // 传递给父组件的信息
  const emit = defineEmits(['close', 'saveSuccess']);
  const props = defineProps(['name']);
  // 文本域
  const message = ref(props.name);
  // 确定按钮
  const onComfirm = async () => {
    try {
      await updateUserProfile({
        name: message.value,
      });
      emit('saveSuccess', message.value);
      emit('close');
      Toast.success('编辑成功');
    } catch (error) {
      if (error && error.response && error.response.status === 409) {
        // 昵称已存在
        Toast.fail('昵称已存在');
      }
    }
  };
  // 取消按钮
  const handleCancle = () => {
    emit('close');
    message.value = props.name;
  };
</script>

<style lang="less" scoped></style>
