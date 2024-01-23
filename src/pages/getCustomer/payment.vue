<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getMoneyWay, addPayplan } from "@/services/getCustomer";
interface payment {
  highsid?: number; //客户id
  planmoney?: string; //回款金额
  termmoney?: string; //回款期数
  moneydate?: string; //回款日期
  waymoney?: string; //汇款方式
}
const formData = ref<payment>({});
const rules = {
  planmoney: {
    rules: [
      {
        required: true,
        errorMessage: "请填写回款金额",
      },
    ],
  },
  termmoney: {
    rules: [
      {
        required: true,
        errorMessage: "请填写回款期数",
      },
    ],
  },
  waymoney: {
    rules: [
      {
        required: true,
        errorMessage: "请选择回款方式",
      },
    ],
  },
};
const popupSource = ref(null);
const sourceValue = ref(null);
const sourceRange = ref([]);
const paymentForm = ref(null);
onLoad((e) => {
  if (e.id) {
    formData.value.highsid = e.id;
  }
  formData.value.moneydate = new Date()
    .toLocaleDateString()
    .split("/")
    .join("-");

  getMoneyWay().then((res: any) => {
    sourceRange.value = res.data.map((item: any) => {
      return {
        value: item.dictLabel,
        text: item.dictValue,
      };
    });
  });
});
function confirm(popup: any) {
  if (sourceValue.value) {
    formData.value.waymoney = sourceValue.value;
  }
  closePop(popup);
}
function submit(ref: any) {
  ref.validate((err: any, value: any) => {
    if (err === null) {
      addPayplan(value).then(() => {
        uni.showToast({
          title: "新增成功",
          icon: "success",
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      });
    }
  });
}
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
}
</script>
<template>
  <view>
    <uni-forms
      err-show-type="toast"
      :rules="rules"
      ref="paymentForm"
      :modelValue="formData"
      label-width="200rpx"
      :border="true">
      <uni-forms-item label="客户ID" name="highsid">
        <uni-easyinput
          type="text"
          :disabled="true"
          v-model="formData.highsid"
          :inputBorder="false"
          :clearable="false" />
      </uni-forms-item>
      <uni-forms-item label="回款金额" name="planmoney">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="formData.planmoney"
          placeholder="请输入回款金额"
          placeholderStyle="text-align: end" />
      </uni-forms-item>
      <uni-forms-item label="回款期数" name="termmoney">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="formData.termmoney"
          placeholder="请输入汇款期数"
          placeholderStyle="text-align: end" />
      </uni-forms-item>
      <uni-forms-item label="回款日期" name="moneydate">
        <uni-datetime-picker
          :clearIcon="false"
          :border="false"
          type="date"
          v-model="formData.moneydate">
        </uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item label="回款方式" name="waymoney">
        <uni-easyinput
          type="text"
          @iconClick="() => openPop(popupSource)"
          :disabled="true"
          suffixIcon="right"
          :inputBorder="false"
          v-model="formData.waymoney"
          placeholder="请选择回款方式"
          placeholderStyle="text-align: end" />
      </uni-forms-item>
    </uni-forms>
    <button
      style="margin-top: 20rpx; width: 60vw; border-radius: 20rpx"
      type="primary"
      @click="submit(paymentForm)">
      提交
    </button>
    <div style="height: 20rpx"></div>
    <view>
      <uni-popup ref="popupSource" type="bottom">
        <view class="detail">
          <view class="log">
            <div class="concel" @click="() => closePop(popupSource)">取消</div>
            <div class="confirm" @click="() => confirm(popupSource)">确定</div>
          </view>
          <uni-data-checkbox v-model="sourceValue" :localdata="sourceRange" />
        </view>
      </uni-popup>
    </view>
  </view>
</template>
<style lang="scss" scoped>
:deep(.uni-forms-item) {
  padding-left: 20rpx;
  padding-right: 20rpx;
}
:deep(.is-disabled) {
  background-color: #ffffff !important;
  color: rgb(51, 51, 51);
}
:deep(.is-disabled .uni-easyinput__placeholder-class) {
  color: #999 !important;
}
:deep(.uni-forms-item__label) {
  padding-left: 10rpx;
}
:deep(.uni-easyinput__content-input) {
  text-align: end;
}
:deep(.detail .checklist-group) {
  flex-direction: column;
}
.detail {
  height: 60vh;
  width: 100%;
  border-top-left-radius: 5rpx;
  border-top-right-radius: 5rpx;
  background-color: #fffefe;
}
.detail .log {
  display: flex;
  justify-content: space-around;
  border-bottom: 0.5rpx solid #f3f3f3;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
:deep(.uni-date-x) {
  justify-content: flex-end !important;
}
:deep(.uni-date__x-input) {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  margin-right: 10rpx;
}
.concel {
  margin: 30rpx 20rpx;
}
.confirm {
  margin: 30rpx 20rpx;
  color: #007aff;
}
:deep(.detail .checklist-box) {
  margin: 35rpx 40rpx !important;
}
</style>
