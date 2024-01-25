<template>
  <!-- formData、rules 内容详见下方完整示例 -->
  <uni-forms
    ref="form"
    :modelValue="formData"
    :rules="signInRules"
    class="form_box">
    <uni-forms-item label="学校" name="cuschool" required>
      <uni-easyinput
        type="text"
        v-model="formData.cuschool"
        placeholder="请输入学校" />
    </uni-forms-item>
    <uni-forms-item label="年级" name="cugrade" required>
      <uni-easyinput
        type="text"
        v-model="formData.cugrade"
        placeholder="请输入年级" />
    </uni-forms-item>
    <uni-forms-item label="申请人" name="djpeop" required>
      <uni-easyinput
        type="text"
        v-model="formData.djpeop"
        placeholder="请输入申请人" />
    </uni-forms-item>
    <button class="btn" @click="submit" type="primary">确认生成二维码</button>
  </uni-forms>
  <div class="signIn">
    <canvas
      id="qrcode"
      canvas-id="qrcode"
      style="width: 280px; height: 280px"></canvas>
  </div>
 </view>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref, onMounted, reactive } from "vue";
import { signInRules } from "./rules";
//ts-ignore
import UQRCode from "uqrcodejs";
let formData = reactive({
  cuschool: "",
  cugrade: "",
  djpeop: "",
  cusource: "签到",
});

const createQRCode = (data) => {
  let encodeParam = encodeURI(
    `cuschool=${data.cuschool}&cugrade=${data.cugrade}&djpeop=${data.djpeop}&cusource=签到`
  );
  formData.cuschool = "";
  formData.cugrade = "";
  formData.djpeop = "";

  // 获取uQRCode实例
  var qr = new UQRCode();
  // 设置二维码内容
  qr.data = `http://stu.ueksx.com/finance/wxsign?${encodeParam}`;
  // 设置二维码大小，必须与canvas设置的宽高一致
  qr.size = 280;
  // 调用制作二维码方法
  qr.make();
  // 获取canvas上下文
  var canvasContext = uni.createCanvasContext("qrcode", this); // 如果是组件，this必须传入
  // 设置uQRCode实例的canvas上下文
  qr.canvasContext = canvasContext;
  // 调用绘制方法将二维码图案绘制到canvas上
  qr.drawCanvas();
};
const form = ref<any>();

const submit = () => {
  form.value
    .validate()
    .then((res) => {
      createQRCode(res);
    })
    .catch((err) => {});
};
</script>

<style lang="scss" scoped>
#qrcode {
  margin: 0 auto;
}
.form_box {
  padding-top: 20rpx;
  padding-left: 50rpx;
  padding-right: 50rpx;
}
.signIn {
  margin-top: 50rpx;
}
.btn {
  margin-top: 40rpx;
  width: 60vw;
  border-radius: 20rpx;
  background-image: linear-gradient(135deg, #158af7, #158af7 70%, #158af7);
  color: #ffffff;
  font-size: 36rpx;
}
</style>
