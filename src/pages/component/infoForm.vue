<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  rules: Object,
  data: Object,
  range: Array,
  sourceRange: Array,
  prodRange: Array,
});
const emit = defineEmits(["changeSource", "changeProd"]);
const clientForm = ref(null);
const popupSource = ref(null);
const popupProd = ref(null);
const source = ref("");
const prod = ref("");
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
}
function sourceConfirm(popup: any) {
  emit("changeSource", source.value);
  closePop(popup);
}
function prodConfirm(popup: any) {
  emit("changeProd", prod.value);
  closePop(popup);
}
function prodChange(e: any) {
  prod.value = e.detail.value;
}
function sourceChange(e: any) {
  source.value = e.detail.value;
}

defineExpose({
  clientForm,
});
</script>

<template>
  <scroll-view scroll-x>
    <uni-forms
      err-show-type="toast"
      :rules="rules"
      ref="clientForm"
      :modelValue="props.data"
      label-width="200rpx"
      :border="true">
      <uni-forms-item label="姓名" name="cuname" required>
        <uni-easyinput
          type="text"
          :clearable="false"
          v-model="props.data.cuname"
          :inputBorder="false"
          placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="性别" name="cusex">
        <uni-data-checkbox
          v-model="data.cusex"
          :localdata="range"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item label="身份证号" name="cuidcard">
        <uni-easyinput
          type="text"
          :clearable="false"
          :inputBorder="false"
          v-model="data.cuidcard"
          placeholder="请输入身份证号" />
      </uni-forms-item>
      <uni-forms-item label="手机号码" name="cutel" required>
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cutel"
          placeholder="请输入手机号码" />
      </uni-forms-item>
      <uni-forms-item label="微信号" name="wechatid">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.wechatid"
          placeholder="请输入微信号码" />
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="cuemail">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cuemail"
          placeholder="请输入邮箱" />
      </uni-forms-item>
      <uni-forms-item label="地址" name="cuaddr">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cuaddr"
          placeholder="请输入地址" />
      </uni-forms-item>
      <uni-forms-item label="学历" name="curecord">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.curecord"
          placeholder="请输入学历" />
      </uni-forms-item>
      <uni-forms-item label="数据来源" name="cusource">
        <uni-easyinput
          type="text"
          @iconClick="() => openPop(popupSource)"
          :disabled="true"
          suffixIcon="right"
          :inputBorder="false"
          v-model="data.cusource"
          placeholder="请选择数据来源" />
      </uni-forms-item>
      <uni-forms-item label="意向产品" name="cuprod">
        <uni-easyinput
          type="text"
          @iconClick="() => openPop(popupProd)"
          :disabled="true"
          suffixIcon="right"
          :inputBorder="false"
          v-model="data.cuprod"
          placeholder="请选择意向产品" />
      </uni-forms-item>
      <uni-forms-item label="学校" name="cuschool">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cuschool"
          placeholder="请输入学校" />
      </uni-forms-item>
      <uni-forms-item label="年级" name="cugrade">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cugrade"
          placeholder="请输入年级" />
      </uni-forms-item>
      <uni-forms-item label="专业" name="cumajor">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cumajor"
          placeholder="请输入专业" />
      </uni-forms-item>
      <uni-forms-item label-position="top" label="家庭情况" name="famstate">
        <uni-easyinput
          type="textarea"
          placeholder="请输入家庭情况"
          :clearable="false"
          v-model="data.famstate" />
      </uni-forms-item>
      <uni-forms-item label-position="top" label="个人介绍" name="perintr">
        <uni-easyinput
          type="textarea"
          placeholder="请输入个人介绍"
          :clearable="false"
          v-model="data.perintr" />
      </uni-forms-item>
      <uni-forms-item label-position="top" label="兴趣爱好" name="cuhobby">
        <uni-easyinput
          type="textarea"
          placeholder="请输入兴趣爱好"
          :clearable="false"
          v-model="data.cuhobby" />
      </uni-forms-item>
      <uni-forms-item label="疑难点" name="cudoubt">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cudoubt"
          placeholder="请输入疑难点" />
      </uni-forms-item>
      <uni-forms-item label="目前状态" name="cunstat">
        <uni-easyinput
          type="text"
          :inputBorder="false"
          :clearable="false"
          v-model="data.cunstat"
          placeholder="请输入目前状态" />
      </uni-forms-item>
      <uni-forms-item label-position="top" label="备注" name="highscont">
        <uni-easyinput
          type="textarea"
          :clearable="false"
          v-model="data.highscont"
          placeholder="请输入备注" />
      </uni-forms-item>
    </uni-forms>
  </scroll-view>
  <view>
    <uni-popup ref="popupSource" type="bottom" style="height: 700rpx">
      <view class="detail">
        <view class="log">
          <div class="concel" @click="() => closePop(popupSource)">取消</div>
          <div class="confirm" @click="() => sourceConfirm(popupSource)">
            确定
          </div>
        </view>
        <uni-data-checkbox
          @change="sourceChange"
          :value="data.cusource"
          :localdata="sourceRange" />
      </view>
    </uni-popup>
  </view>
  <view>
    <uni-popup ref="popupProd" type="bottom" style="height: 700rpx">
      <view class="detail">
        <view class="log">
          <div class="concel" @click="() => closePop(popupProd)">取消</div>
          <div class="confirm" @click="() => prodConfirm(popupProd)">确定</div>
        </view>
        <uni-data-checkbox
          @change="prodChange"
          :value="data.cuprod"
          :localdata="prodRange" />
      </view>
    </uni-popup>
  </view>
</template>
<style>
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
</style>
