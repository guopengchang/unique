<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getClient, updateClient } from "@/services/getCustomer";
import type { client } from "./type";
import { rules } from "./rules";
import infoForm from "../component/infoForm.vue";
import { range, resultlize, sourceRange, prodRange } from "./data";
const formData = ref<client>({});
const oldValue = ref({});
const clientForm = ref(null);
const clientId = ref({});

onLoad((e) => {
  getClient(e.id).then((res: any) => {
    clientId.value = { id: e.id };
    const result = resultlize(res);
    formData.value = result;
    oldValue.value = Object.assign({}, result);
  });
});

function submit(ref: any) {
  ref.clientForm.validate((err: any, value: any) => {
    if (JSON.stringify(oldValue.value) == JSON.stringify(value)) {
      return uni.showToast({
        title: "数据未更改",
        icon: "none",
      });
    }
    if (err === null) {
      updateClient({ ...clientId.value, ...value }).then(() => {
        uni.showToast({
          title: "修改成功",
          icon: "success",
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      });
      oldValue.value = value;
    }
  });
}

function prodChange(e: any) {
  formData.value.cuprod = e;
}
function sourceChange(e: any) {
  formData.value.cusource = e;
}
</script>
<template>
  <view>
    <info-form
      ref="clientForm"
      :rules="rules"
      :range="range"
      :source-range="sourceRange"
      :prod-range="prodRange"
      :data="formData"
      @change-source="sourceChange"
      @change-prod="prodChange">
    </info-form>
    <button
      style="margin-top: 20rpx; width: 60vw; border-radius: 20rpx"
      type="primary"
      @click="submit(clientForm)">
      提交
    </button>
    <div style="height: 20rpx"></div>
  </view>
</template>
<style lang="scss" scoped>
:deep(.uni-forms-item) {
  padding-left: 20rpx;
  padding-right: 20rpx;
}
:deep(.checklist-group) {
  justify-content: flex-end;
}
:deep(.is-disabled) {
  background-color: #ffffff !important;
  color: rgb(51, 51, 51);
}
:deep(.uni-easyinput__content-input) {
  text-align: right;
  direction: rtl;
}
:deep(.is-disabled .uni-easyinput__placeholder-class) {
  color: #999 !important;
}
:deep(.uni-forms-item__label) {
  padding-left: 10rpx;
}
:deep(.detail .checklist-group) {
  flex-direction: column;
}
:deep(.detail .checklist-box) {
  margin: 35rpx 40rpx !important;
}
</style>
