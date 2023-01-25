<template>
  <van-date-picker v-model="currentDate" title="选择日期" :min-date="minDate" :max-date="maxDate" />
</template>

<script setup>
  import { ref } from 'vue';
  const currentDate = ref(['2021', '01', '01']);
  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date(2025, 5, 1);
</script>

<style lang="less" scoped></style>
