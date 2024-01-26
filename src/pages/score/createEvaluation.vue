<template>
  <!-- formData、rules 内容详见下方完整示例 -->
  <view style="margin: 50rpx">
    <uni-forms
      ref="form"
      :modelValue="formData"
      :rules="evalRules"
      err-show-type="toast"
      label-width="150rpx"
      class="form_box"
    >
      <uni-forms-item label="测评班级" name="evalclass" required>
        <uni-easyinput
          :styles="clas"
          
          :disabled="disabled"
          type="text"
          v-model="formData.evalclass"
          placeholder="请输入测评班级"
        />
      </uni-forms-item>
      <uni-forms-item label="测评阶段" name="evalstage" required>
        <uni-easyinput
          :styles="clas"
          :disabled="disabled"
          type="text"
          v-model="formData.evalstage"
          placeholder="请输入测评阶段"
        />
      </uni-forms-item>
      <uni-forms-item label="测评老师" name="evalteach" required>
        <uni-easyinput
          :styles="clas"
          :disabled="disabled"
          type="text"
          v-model="formData.evalteach"
          placeholder="请输入测评老师"
        />
      </uni-forms-item>
      <uni-forms-item label="测评时间" name="evaldate" required>
        <uni-datetime-picker :clearIcon="false" :border="false" type="date" v-model="formData.evaldate">
        </uni-datetime-picker>
      </uni-forms-item>
      <button class="btn" @click="submit">确认生成二维码</button>
    </uni-forms>
  </view>
  <div class="signIn" :class="{ mask: cla }">
    <canvas class="canva" id="qrcode" canvas-id="qrcode" style="width: 280px; height: 280px"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref, onMounted, reactive, computed } from "vue";
import { evalRules } from "../getCustomer/rules";
import { addEval } from "../../services/score";
//ts-ignore
import UQRCode from "uqrcodejs";
const disabled = ref(false);
const clas: any = { disableColor: "#FFFFFF",};
let formData = reactive({
  evalclass: "",
  evalstage: "",
  evalteach: "",
  evaldate: "",
});

let rid = computed(() => {
  return formData.evaldate+Math.random().toString()
});

const createQRCode = (data:any) => {
  let encodeParam = encodeURI(`rid=${data}`);

  // 获取uQRCode实例
  var qr = new UQRCode();
  // 设置二维码内容
  qr.data = `http://stu.ueksx.com/finance/evaluate?${encodeParam}`;
  console.log(qr.data);
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
const cla = ref(false);

const submit = () => {
  disabled.value = true;
  uni.showLoading({
    title: "加载中",
  });
  form.value
    .validate()
    .then((res) => {
      console.log(rid.value);
      addEval({ ...res, rid: rid.value });
      createQRCode(rid.value);
      cla.value = true;
      uni.hideLoading();
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

.btn {
  margin-top: 40rpx;
  width: 60vw;
  border-radius: 20rpx;
  background-image: linear-gradient(135deg, #158af7, #158af7 70%, #158af7);
  color: #ffffff;
  font-size: 36rpx;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.canva {
  width: 280px;
  height: 280px;
  margin-top: 250px !important;
}
</style>
