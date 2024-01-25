<script setup lang="ts">
import { ref } from "vue";
import { addclueflist, getSource, getProd } from "@/services/getCustomer";
import type { client } from "../type";
import { rules } from "../rules";
import infoForm from "../../component/infoForm.vue";
import { range } from "../data";
import { onLoad } from "@dcloudio/uni-app";
const formData = ref<client>({});
const clientForm = ref(null);
const sourceRange = ref([]);
const prodRange = ref([]);
const color = ref("a");
const agreement = ref<any>(true);
onLoad(() => {
  getSource().then((res: any) => {
    sourceRange.value = res.data.map((item: any) => {
      return {
        value: item.dictLabel,
        text: item.dictValue,
      };
    });
  });
  getProd().then((res: any) => {
    prodRange.value = res.data.map((item: any) => {
      return {
        value: item.dictLabel,
        text: item.dictValue,
      };
    });
  });
});

function prodChange(e: any) {
  formData.value.cuprod = e;
}
function sourceChange(e: any) {
  formData.value.cusource = e;
}
function submit(ref: any) {
  ref.clientForm.validate((err: any, value: any) => {
    if (err === null) {
      addclueflist({ ...value, cuflag: 0, receiveflag: 0 }).then(() => {
        uni.showToast({
          title: "新建成功",
          icon: "success",
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      });
    }
  });
}

function clickbox(e: any) {
  // console.log(e.detail.value.length)
  if (e.detail.value.length === 1) {
    agreement.value = false;
    color.value = "b";
  } else {
    agreement.value = true;
    color.value = "a";
  }
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
    <checkbox-group
      name="checkbox"
      style="display: flex; justify-content: center"
      @change="clickbox">
      <label>
        <checkbox color="blue" class="box" />
      </label>
      <view style="margin: 20rpx 0rpx 20rpx 20rpx"> 提交代表您同意 </view>
      <navigator url="/pages/getCustomer/clue/text" class="text"
        >用户协议和隐私政策
      </navigator>
    </checkbox-group>
    <button
      :disabled="agreement"
      :style="
        color === 'a'
          ? ' color: rgba(225, 225, 225, 0.6); background-color: #4b9ff8;'
          : 'color: #ffffff; background-color: #007aff;'
      "
      style="margin-top: 20rpx; width: 60vw; border-radius: 20rpx"
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
  // direction: rtl;
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
.text {
  margin: 20rpx 20rpx 20rpx 0;
  color: blue;
}
.box {
  margin: 20rpx 0;
}
</style>
