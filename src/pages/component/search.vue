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
let id: any = true;
function handleInput() {
  if (!id) return;
  id = false;
  setTimeout(() => {
    nextTick(() => {
      emit("input", filters.value);
      id = true;
    });
  }, 500);
}
</script>
