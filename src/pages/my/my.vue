<template>
  <view class="navbar"  :style="{ paddingTop:` ${top}+ rpx` }">
    <!-- logo文字 -->
    <view class="logo">
      <text class="logo-text">个人信息</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets  } = uni.getSystemInfoSync() ;
//ts-ignore
const top = safeAreaInsets?.top ||0;
let recordingFlag = ref();
// 调用音频


</script>

<style lang="scss" scoped></style>