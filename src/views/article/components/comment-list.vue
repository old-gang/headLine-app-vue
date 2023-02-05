<template>
  <div> 评论列表 </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { reqGetCommentList } from '@/api/comment';

  onMounted(() => {
    getCommentList();
  });

  // 获取品论列表
  const offset = ref(1);
  const limit = ref(10);
  const getCommentList = () => {
    try {
      let res = reqGetCommentList({
        type: 'a',
        source: props.articleId,
        offset: offset.value,
        limit: limit.value,
      });
      console.log(res);
    } catch (error) {
      console.log('请求错误', error);
    }
  };
  const props = defineProps({
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  });
</script>

<style lang="less" scoped></style>
