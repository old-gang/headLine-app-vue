<template>
  <div>
    <img class="img" :src="file" alt="" ref="imgRef" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="emit('close')"
      @click-right="onConfirm" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { updateUserPhoto } from '@/api/user';
  import { Toast } from 'vant';
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';

  const props = defineProps(['img']);
  const emit = defineEmits(['close', 'update-phote']);

  // window.URL.createObjectURL(DOM) 获取图片的url路径
  const file = ref(window.URL.createObjectURL(props.img));

  // 确认
  const onConfirm = async () => {
    // 如果要求 Content-Type 是 multipart/form-data，则一定要提交FormData数据对象，专门用于文件上传的
    // const fd = new FormData();
    // fd.append('photo', props.img);

    //添加裁切功能
    const file = await getCroppedCanvas();
    const fd = new FormData();
    fd.append('photo', file);
    await updateUserPhoto(fd);
    // 成功后更新父组件的数据
    // emit('update-phote', file.value);
    emit('update-phote', window.URL.createObjectURL(file));
    // 关闭弹出层
    emit('close');
    // 提示
    Toast.success('更新成功');
  };

  // 图片裁切
  const imgRef = ref();
  const cropper = ref(null);
  // 获取裁切后的图片实例
  const getCroppedCanvas = () => {
    return new Promise((resolve) => {
      cropper.value.getCroppedCanvas().toBlob((blob) => {
        resolve(blob);
      });
    });
  };

  onMounted(() => {
    // 获取需要裁减的dom
    const image = imgRef.value;
    cropper.value = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1, //自动裁切区域
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  });
</script>

<style lang="less" scoped>
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .img {
    display: block;
    max-width: 100%;
  }
</style>
