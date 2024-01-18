<script setup lang="ts">
import { ref } from "vue";
const showList = ref(false);
const emit = defineEmits(['handleSea', 'handleFollow','handlePayment'])
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
    <view class="listItem" @click="emit('handleFollow')">写跟进</view>
    <view class="listItem" @click="emit('handleSea')">移入公海</view>
    <view class="listItem" @click="emit('handlePayment')">新建回款</view>
  </view>
</template>
