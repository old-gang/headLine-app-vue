<template>
  <div class="user-profile">
    <van-nav-bar
      style="background: #6db4fb"
      title="个人信息"
      left-arrow
      @click-left="router.back()" />
    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center @click="inputRef.click()">
        <template #default>
          <van-image width="30" fit="cover" height="30" round :src="user.photo" />
          <!-- file选择框 -->
          <input type="file" ref="inputRef" hidden accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="user.name" @click="isEditNameShow = true" />
      <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow = true" />
    </van-cell-group>

    <!-- 修改姓名弹出层 -->
    <van-popup v-model:show="isEditNameShow" position="bottom" :style="{ height: '100%' }">
      <edit-name @close="handleClose" @saveSuccess="handleNameSave" :name="user.name"></edit-name>
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model:show="isEditBirthdayShow" position="bottom" :style="{ height: '40%' }">
      <edit-birthday></edit-birthday>
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup v-model:show="isEditPhotoShow" position="bottom" :style="{ height: '100%' }">
      <edit-photo
        v-if="isEditPhotoShow"
        :img="previewImg"
        @close="isEditPhotoShow = false"
        @update-phote="user.photo = $event"></edit-photo>
    </van-popup>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { reqGetUserProfile } from '@/api/user';
  import editName from './components/edit-name.vue';
  import editBirthday from './components/edit-birthday.vue';
  import editPhoto from './components/edit-photo.vue';

  const router = useRouter();
  // 用户资料
  const user = ref({});
  const getUserProfile = async () => {
    try {
      let res = await reqGetUserProfile();
      user.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  // 编辑
  const isEditNameShow = ref(false);
  const isEditBirthdayShow = ref(false);

  const handleClose = (message) => {
    isEditNameShow.value = false;
  };
  // 保存成功
  const handleNameSave = (val) => {
    user.value.name = val;
  };
  // 图像编辑
  const inputRef = ref();
  const isEditPhotoShow = ref(false);
  const previewImg = ref(null);
  const onFileChange = () => {
    // 展示弹出层
    isEditPhotoShow.value = true;
    // 在弹出层中预览图片
    const blob = inputRef.value.files[0];
    previewImg.value = blob;
    // 为了解决相同文件不触发change事件，需要手动清空file的value的值
    inputRef.value.value = '';
  };

  onMounted(() => {
    getUserProfile();
  });
</script>

<style lang="less" scoped>
  .user-profile {
    :deep(.van-popup) {
      background-color: #f5f7f9;
    }
  }
</style>
