<template>
  <div class="signIn">signIn
    <canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onReady } from '@dcloudio/uni-app';
 import { ref ,onMounted} from 'vue'
 //ts-ignore
 import UQRCode from 'uqrcodejs';

 onReady(()=>{
 // 获取uQRCode实例
 var qr = new UQRCode();
  // 设置二维码内容
  qr.data = "https://www.bilibili.com/video/BV1834y1676P?p=3&vd_source=705343a89f38d5c0d895383ccf38a5d6";
  // 设置二维码大小，必须与canvas设置的宽高一致
  qr.size = 200;
  // 调用制作二维码方法
  qr.make();
  // 获取canvas上下文
  var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
  // 设置uQRCode实例的canvas上下文
  qr.canvasContext = canvasContext;
  // 调用绘制方法将二维码图案绘制到canvas上
  qr.drawCanvas();
 })
</script>

<style scoped></style>