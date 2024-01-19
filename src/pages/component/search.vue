<template>
  <uni-easyinput
    prefixIcon="search"
    v-model="filters"
    style="height: 60rpx; padding: 15rpx 10rpx; width: auto"
    focus
    :placeholder="placeholder"
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
const placeholder = ref(props.tips);
function handleInput() {
  nextTick(() => {
    emit("input", filters.value);
  });
}
</script>

<style scoped></style>
