<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <template #title>
        <div class="channel-title"> 我的频道 </div>
      </template>
      <van-button type="danger" plain round size="mini" @click="isEdit = !isEdit">{{
        isEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === props.active }"
        v-for="(value, index) in props.userChannels"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        :key="value.id"
        :text="value.name"
        @click="onUserChannelClick(value, index)" />
    </van-grid>
    <!-- 我的推荐 -->
    <van-cell center :border="false">
      <template #title>
        <div class="channel-title"> 频道推荐 </div>
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAdd(item)" />
    </van-grid>
  </div>
</template>

<script setup>
  import { reqAllChannels, reqUpdataUserChannel, reqDelUserChannel } from '@/api/channel';
  import { onMounted, ref, computed } from 'vue';
  import { useUserInfoStore } from '@/store/userInfo';
  import { getItem, setItem } from '@/utils/storage';

  // 父组件传递的数据
  const props = defineProps(['userChannels', 'active']);
  // 子通信父
  const emit = defineEmits(['switch', 'updataActive']);
  // 使用仓库
  const userInfo = useUserInfoStore();
  // 频道推荐
  const allChannels = ref([]);
  const getAllChannels = async () => {
    let res = await reqAllChannels();
    allChannels.value = res.data.channels;
  };

  const recommendChannels = computed(() => {
    // 计算出推荐列表
    return allChannels.value.filter((item) => {
      return !props.userChannels.find((val) => {
        return item.id === val.id;
      });
    });
  });

  // 新增频道列表
  const onAdd = async (channel) => {
    props.userChannels.push(channel);
    // 持久化
    if (userInfo.user) {
      // 已登录，调接口，将数据储存到数据库
      await reqUpdataUserChannel({
        channels: [
          {
            id: channel.id,
            seq: props.userChannels.length,
          },
        ],
      });
    } else {
      // 未登录，将数据存储到本地
      setItem('user-channels', props.userChannels);
    }
  };

  // 编辑
  const isEdit = ref(false);
  const onUserChannelClick = (channel, index) => {
    if (isEdit.value && index !== 0) {
      // 编辑状态，删除
      delChannel(channel, index);
    } else {
      // 查看状态，切换到列表
      switchChannel(index);
    }
  };
  const delChannel = async (channel, index) => {
    // 如果删除的是当前激活频道之前的频道
    if (index <= props.active) {
      emit('updataActive', props.active - 1);
    }
    props.userChannels.splice(index, 1);
    // 数据持久化
    if (userInfo.user) {
      await reqDelUserChannel(channel.id);
    } else {
      setItem('user-channels', props.userChannels);
    }
  };
  const switchChannel = (index) => {
    // 关闭弹出层
    emit('switch', false);
    // 切换频道数据
    emit('updataActive', index);
  };

  onMounted(() => {
    getAllChannels();
  });
</script>

<style lang="less" scoped>
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: #333;
    }
    .grid-item {
      width: 80px;
      height: 43px;
      :deep(.van-grid-item__content) {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
        .van-grid-item__icon {
          font-size: 18px;
          color: #ccc;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          z-index: 10;
        }
      }
    }
    .active {
      :deep(.van-grid-item__text) {
        color: red !important;
      }
    }
  }
</style>
