<script setup lang="ts">
import { ref } from "vue";
const showList = ref(false);
const emit = defineEmits([
  "handleSea",
  "handleFollow",
  "handlePayment",
  "handleCall",
]);
function showDropdown() {
  showList.value = !showList.value;
}
function closeDropdown() {
  showList.value = false;
}

defineExpose({
  showDropdown,
  closeDropdown,
});
</script>

<template>
  <view class="list" v-if="showList">
    <view class="listItem" @click="emit('handleFollow')">写跟进</view>/
    <view class="listItem" @click="emit('handleSea')">移入公海</view>/
    <view class="listItem" @click="emit('handlePayment')">新建回款</view>/
    <view class="listItem" @click="emit('handleCall')">拨打电话</view>
  </view>
</template>
<style scoped>
.listItem:hover {
  color: #004a99;
}

.list {
  position: absolute;
  padding: 5rpx 10rpx;
  border: 1rpx solid #007aff;
  border-radius: 5rpx;
  color: #007aff;
  right: 40rpx;
  margin-top: 5rpx;
  display: flex;
}

.listItem {
  text-align: center;
  padding: 3rpx 0;
}
</style>
