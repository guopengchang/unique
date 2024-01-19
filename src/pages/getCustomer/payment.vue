<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getMoneyWay, addPayplan } from "@/services/getCustomer";
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
}

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

function confirm(popup: any) {
  if (sourceValue.value) {
    formData.value.waymoney = sourceValue.value;
  }
  closePop(popup);
}

function maskClick(e: any) {
  console.log(e);
}

function submit(ref: any) {
  ref.validate((err: any, value: any) => {
    console.log(err, value);
    if (err === null) {
      addPayplan(value)
        .then(() => {
          uni.showToast({
            title: "新增成功",
            icon: "success",
          });
        })
        .then(() => {
          uni.navigateBack();
        });
    }
  });
}

const paymentForm = ref(null);
interface payment {
  highsid?: number; //客户id
  planmoney?: string; //回款金额
  termmoney?: string; //回款期数
  moneydate?: string; //回款日期
  waymoney?: string; //汇款方式
}
const formData = ref<payment>({});

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
</script>
<template>
  <view>
    <uni-forms
      err-show-type="toast"
      :rules="rules"
      ref="paymentForm"
      :modelValue="formData"
      label-width="85px"
      :border="true">
      <uni-forms-item label="客户ID" name="highsid">
        <uni-easyinput
          type="text"
          :disabled="true"
          style="text-align: end"
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
          style="text-align: end"
          placeholder="请输入回款金额"
          placeholderStyle="text-align: end" />
      </uni-forms-item>
      <uni-forms-item label="回款期数" name="termmoney">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          style="text-align: end"
          v-model="formData.termmoney"
          placeholder="请输入汇款期数"
          placeholderStyle="text-align: end" />
      </uni-forms-item>
      <uni-forms-item label="回款日期" name="moneydate">
        <uni-datetime-picker
          style="text-align: end"
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
          style="text-align: end"
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
      <uni-popup ref="popupSource" type="bottom" style="height: 700rpx">
        <view class="detail">
          <view
            style="
              display: flex;
              justify-content: space-around;
              border-bottom: 0.5rpx solid #f3f3f3;
              font-size: 14rpx;
              margin-bottom: 20rpx;
            ">
            <div style="margin: 10rpx 0" @click="() => closePop(popupSource)">
              取消
            </div>
            <div
              style="margin: 10rpx 0; color: #007aff"
              @click="() => confirm(popupSource)">
              确定
            </div>
          </view>
          <uni-data-checkbox v-model="sourceValue" :localdata="sourceRange" />
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.checklist-group) {
  justify-content: end;
}
:deep(.is-disabled) {
  background-color: #ffffff !important;
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
:deep(.detail .uni-label-pointer) {
  margin: 15rpx 20rpx !important;
}
.detail {
  height: 60vh;
  width: 100%;
  border-top-left-radius: 5rpx;
  border-top-right-radius: 5rpx;
  background-color: #fffefe;
}
:deep(.is-disabled .uni-input-input) {
  color: rgb(51, 51, 51);
}
:deep(.uni-date-x) {
  justify-content: end;
}
:deep(.uni-date__x-input) {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  margin-right: 10rpx;
}
</style>
