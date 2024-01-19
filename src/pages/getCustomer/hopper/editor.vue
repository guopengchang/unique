<template>
  <view>
    <form class="box" :modelValue="tableForm" @submit="submit">
      <view class="line">
        <view class="label">客户名称</view>
        <input v-model="tableForm.cuname" name="cuname" />
      </view>
      <view class="line">
        <view class="label"> 所学课程</view>
        <input v-model="tableForm.cuprod" name="cuprod" />
      </view>
      <view class="line">
        <view class="label"> 招入老师</view>
        <input v-model="tableForm.djpeop" name="djpeop" />
      </view>

      <view class="op">
        <button class="confirm" form-type="submit">确认</button>
      </view>
    </form>
  </view>
</template>
<script setup>
import { getQrCodeOne,gets } from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
// 存放数据
const tableForm = ref({});
//存放id
const id=ref()


onLoad((e) => {
  //获取id
  console.log(e)
  id.value=e.id
  //获取数据
  getQrCodeOne(e.id).then((res) => {
    tableForm.value = res.data;
  });
});
//点击确定按钮发送网络请求
function submit(e) {
  gets(id.value,{...e.detail.value,id:id.value});
  uni.navigateTo({
    url: '/pages/getCustomer/hopper/list'
  });
}
</script>
<style lang="scss" scoped>
.box {
  font-size: 28rpx;
  background: #fff;

  .line {
    background: #fff;
    border-bottom: 1rpx solid #e3d8d8;
    position: relative;
    padding: 24rpx 20rpx 24rpx 150rpx;

    line-height: 36rpx;

    .label {
      position: absolute;
      top: 30rpx;
      left: 0;
      padding: 0 20rpx;
      width: 130rpx;
      color: #999;
    }
    input {
      color: #333;
      line-height: 36rpx;
    }
  }
  button {
    width: 710rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin: 20rpx auto;
    border: none;
    outline: none;
    font-size: 32rpx;
  }
  button::after {
    content: "";
    width: 0 !important;
    height: 0 !important;
  }
  .op {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    background: #fff;

    .confirm {
      background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
      color: #fff;
    }
    .remove {
      border: 1rpx solid #ccc;
      box-shadow: 0 6rpx 12rpx 0 rgb(0 0 0 / 5%);
      color: #333;
    }
  }
}
</style>
