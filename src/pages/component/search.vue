<template>
  <uni-easyinput
    prefixIcon="search"
    v-model="filters"
    :placeholder="tips"
    @input="handleInput">
  </uni-easyinput>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
const props = defineProps({
  filters: String,
  tips: String,
});

const emit = defineEmits(["input"]);
const filters = ref(props.filters);
let id: any;
function handleInput() {
  clearTimeout(id);
  id = setTimeout(() => {
    nextTick(() => {
      emit("input", filters.value);
    });
  }, 500);
}
</script>

<style scoped>
:deep(.uni-easyinput) {
  padding-left: 30rpx;
  padding-right: 30rpx;
  width: auto !important;
  padding-top: 20rpx;
  padding-bottom: 10rpx;
}
:deep(.uni-easyinput__content-input) {
  height: 70rpx !important;
}

:deep(.uni-easyinput__content) {
  height: 70rpx;
}
</style>
