<template>
  <div class="article-wrap">
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      class="app-nav-bar"
      left-arrow
      @click-left="router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ article.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :label="realtiveTime(article.pubdate)">
        <template #title>
          {{ article.aut_name }}
        </template>
        <template #icon>
          <img :src="article.aut_photo" class="avatar" alt="" />
        </template>
        <template #default>
          <div>
            <van-button
              v-if="article.is_followed"
              class="follow-btn"
              type="info"
              round
              size="mini"
              plain
              >已关注</van-button
            >
            <van-button v-else class="follow-btn" icon="plus" round type="primary" size="mini"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content markdown-body" ref="articleContent" v-html="article.content"> </div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <!-- attitude：-1-无态度；0-不喜欢；1-已点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" plain size="small">点赞</van-button>
      </div>

      <!-- 品论列表 -->
      <comment-list :articleId="articleId"></comment-list>
    </div>

    <!-- 底部区域 -->
    <div class="footer">
      <van-button plain type="primary">写评论</van-button>
    </div>
  </div>
</template>

<script setup>
  import { reqGetArticleById } from '@/api/article';
  import { ref, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { realtiveTime } from '@/hook/useDayjs';
  import { ImagePreview } from 'vant';
  import commentList from './components/comment-list.vue';
  import './github-markdown.css';

  const router = useRouter();

  onMounted(() => {
    loadArticle();
  });
  // 文章
  const article = ref({});
  const articleContent = ref();
  const loadArticle = async () => {
    try {
      let res = await reqGetArticleById(props.articleId);
      article.value = res.data;
      // 实现图片预览功能
      nextTick(() => {
        handleImgPreview();
      });
    } catch (error) {
      console.log('获取失败', error);
    }
  };
  // 图片预览
  const handleImgPreview = () => {
    // 获取文档的dom对象,获取所有的图片标签
    const imgs = articleContent.value.querySelectorAll('img');
    let imgsPath = [];
    // 调用ImagePreview方法
    imgs.forEach((img, index) => {
      imgsPath.push(img.src);
      img.onclick = function () {
        ImagePreview({
          images: imgsPath,
          startPosition: index,
        });
      };
    });
  };
  const props = defineProps({
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .article-container {
    padding: 10px;
    margin-top: 46px;
    position: fixed;
    top: 0px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .art-title {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  .art-content {
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
    /deep/ img {
      width: 100%;
    }
    /deep/ pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  .van-cell {
    padding: 5px 0;
    &::after {
      display: none;
    }
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;
    margin-right: 5px;
    border: none;
  }

  .like-box {
    display: flex;
    justify-content: center;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  .footer {
    position: fixed;
    bottom: 0;
  }
</style>
