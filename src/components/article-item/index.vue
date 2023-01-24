<template>
  <van-cell class="article-item" :to="'/article/' + article.art_id">
    <template #title>
      <div class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    </template>
    <template #label>
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-wrap-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image class="cover-item" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ time(article.pubdate) }}</span>
      </div>
    </template>
    <!-- 单张封面 -->
    <template #value v-if="article.cover.type === 1">
      <van-image class="right-cover" fit="cover" :src="article.cover.images[0]" />
    </template>
  </van-cell>
</template>

<script setup>
  // 引入自定义函数
  import time from '@/hook/useDayjs';
  defineProps(['article']);
</script>

<style scoped lang="less">
  .article-item {
    .title {
      font-size: 16;
      color: #3a3a3a;
    }
    :deep(.van-cell__value) {
      flex: unset;
      width: 116px;
      height: 74px;
      margin-left: 12px;
    }
    .right-cover {
      width: 116px;
      height: 74px;
    }
    .cover-wrap {
      display: flex;
      flex-wrap: nowrap;
      padding: 15px 0;
      .cover-wrap-item {
        flex: 1;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item {
          width: 100%;
          height: 73px;
        }
      }
    }
    .label-wrap {
      font-size: 11px;
      color: #b4b4b4;
    }
    .label-wrap span {
      margin-right: 12px;
    }
  }
</style>
