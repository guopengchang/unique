<template>
  <view class="navbar"  :style="{ paddingTop:` ${top}+ rpx` }">
    <!-- logo文字 -->
    <view class="logo">
      <image class="logo-image" src="@/static/logo.png"></image>
      <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <view>
      <image src="/static/数据.png" class="image" />
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
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

<style scoped></style>