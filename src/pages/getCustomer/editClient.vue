<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  getSource,
  getProd,
  getClient,
  updateClient,
} from "@/services/getCustomer";
import type {client} from './type'
import { rules } from "./rules";

const formData = ref<client>({});
const oldValue = ref({});
const clientForm = ref(null);
const clientId = ref({});
const range = [
  { value: "男", text: "男" },
  { value: "女", text: "女" },
];
const popupSource = ref(null);
const sourceValue = ref(null);
const sourceRange = ref([]);
const popupProd = ref(null);
const prodValue = ref(null);
const prodRange = ref([]);

onLoad((e) => {
  getClient(e.id).then((res: any) => {
    console.log(res)
    clientId.value = { id: e.id };
    const result = {
      cuname: res.data.cuname,
      cusex: res.data.cusex,
      cuidcard: res.data.cuidcard,
      cutel: res.data.cutel,
      wechatid: res.data.wechatid,
      cuemail: res.data.cuemail,
      cuaddr: res.data.cuaddr,
      curecord: res.data.curecord,
      cusource: res.data.cusource,
      cuprod: res.data.cuprod,
      cuschool: res.data.cuschool,
      cugrade: res.data.cugrade,
      cumajor: res.data.cumajor,
      highscont: res.data.highscont,
    };
    formData.value = result;
    oldValue.value = Object.assign({}, result);
    sourceValue.value = res.data.cusource;
    prodValue.value = res.data.cuprod;
  });
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
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
}
function submit(ref: any) {
  ref.validate((err: any, value: any) => {
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
      });
      oldValue.value = value;
    }
  });
}
function confirm(popup: any) {
  if (sourceValue.value) {
    formData.value.cusource = sourceValue.value;
  }
  if (prodValue.value) {
    formData.value.cuprod = prodValue.value;
  }
  closePop(popup);
}
</script>
<template>
  <view class="">
    <scroll-view scroll-x>
      <uni-forms
        err-show-type="toast"
        :rules="rules"
        ref="clientForm"
        :modelValue="formData"
        label-width="200rpx"
        :border="true">
        <uni-forms-item label="姓名" name="cuname" required>
          <uni-easyinput
            type="text"
            :clearable="false"
            v-model="formData.cuname"
            :inputBorder="false"
            placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="性别" name="cusex">
          <uni-data-checkbox
            v-model="formData.cusex"
            :localdata="range"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label="身份证号" name="cuidcard">
          <uni-easyinput
            type="text"
            :clearable="false"
            :inputBorder="false"
            v-model="formData.cuidcard"
            placeholder="请输入身份证号" />
        </uni-forms-item>
        <uni-forms-item label="手机号码" name="cutel" required>
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cutel"
            placeholder="请输入手机号码" />
        </uni-forms-item>
        <uni-forms-item label="微信号" name="wechatid">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.wechatid"
            placeholder="请输入微信号码" />
        </uni-forms-item>
        <uni-forms-item label="邮箱" name="cuemail">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cuemail"
            placeholder="请输入邮箱" />
        </uni-forms-item>
        <uni-forms-item label="地址" name="cuaddr">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cuaddr"
            placeholder="请输入地址" />
        </uni-forms-item>
        <uni-forms-item label="学历" name="curecord">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.curecord"
            placeholder="请输入学历" />
        </uni-forms-item>
        <uni-forms-item label="数据来源" name="cusource">
          <uni-easyinput
            type="text"
            @iconClick="() => openPop(popupSource)"
            :disabled="true"
            suffixIcon="right"
            :inputBorder="false"
            v-model="formData.cusource"
            placeholder="请选择数据来源" />
        </uni-forms-item>
        <uni-forms-item label="意向产品" name="cuprod">
          <uni-easyinput
            type="text"
            @iconClick="() => openPop(popupProd)"
            :disabled="true"
            suffixIcon="right"
            :inputBorder="false"
            v-model="formData.cuprod"
            placeholder="请选择意向产品" />
        </uni-forms-item>
        <uni-forms-item label="学校" name="cuschool">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cuschool"
            placeholder="请输入学校" />
        </uni-forms-item>
        <uni-forms-item label="年级" name="cugrade">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cugrade"
            placeholder="请输入年级" />
        </uni-forms-item>
        <uni-forms-item label="专业" name="cumajor">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cumajor"
            placeholder="请输入专业" />
        </uni-forms-item>
        <uni-forms-item label-position="top" label="家庭情况" name="famstate">
          <uni-easyinput
            type="textarea"
            placeholder="请输入家庭情况"
            :clearable="false"
            v-model="formData.famstate" />
        </uni-forms-item>
        <uni-forms-item label-position="top" label="个人介绍" name="perintr">
          <uni-easyinput
            type="textarea"
            placeholder="请输入个人介绍"
            :clearable="false"
            v-model="formData.perintr" />
        </uni-forms-item>
        <uni-forms-item label-position="top" label="兴趣爱好" name="cuhobby">
          <uni-easyinput
            type="textarea"
            placeholder="请输入兴趣爱好"
            :clearable="false"
            v-model="formData.cuhobby" />
        </uni-forms-item>
        <uni-forms-item label="疑难点" name="cudoubt">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cudoubt"
            placeholder="请输入疑难点" />
        </uni-forms-item>
        <uni-forms-item label="目前状态" name="cunstat">
          <uni-easyinput
            type="text"
            :inputBorder="false"
            :clearable="false"
            v-model="formData.cunstat"
            placeholder="请输入目前状态" />
        </uni-forms-item>
        <uni-forms-item label-position="top" label="备注" name="highscont">
          <uni-easyinput
            type="textarea"
            :clearable="false"
            v-model="formData.highscont"
            placeholder="请输入备注" />
        </uni-forms-item>
      </uni-forms>
    </scroll-view>
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
    <view>
      <uni-popup ref="popupProd" type="bottom">
        <view class="detail">
          <view class="log">
            <div class="concel" @click="() => closePop(popupProd)">取消</div>
            <div class="confirm" @click="() => confirm(popupProd)">确定</div>
          </view>
          <uni-data-checkbox v-model="prodValue" :localdata="prodRange" />
        </view>
      </uni-popup>
    </view>
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
.detail {
  height: 60vh;
  width: 100%;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  background-color: #fffefe;
}
.detail .log {
  display: flex;
  justify-content: space-around;
  border-bottom: 0.5rpx solid #f3f3f3;
  font-size: 28rpx;
  margin-bottom: 20rpx;
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
