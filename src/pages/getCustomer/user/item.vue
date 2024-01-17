<template>
  <view class="line">
    <view>
      <view class="label">负责人</view>
      <view style="margin-left: 190rpx">
        <uni-data-picker @change="onchange" style="width: 400rpx" :clear-icon="false" placeholder="点击选择" :localdata="items"> </uni-data-picker>
      </view>
    </view>
  </view>
  <view class="line1">
    <view class="label1">团队成员</view>
    <view class="round"></view>
  </view>
  <view class="op">
    <button class="confirm" form-type="submit" @click="handleDefine">确认</button>
  </view>
</template>
<script setup>
import { getlist } from "../../../../src/services/getCustomer";
import { ref } from "vue";

//存放网络层返回的数据
const userName=ref({})

//存放全部负责人姓名
const items=ref([])

//获取选择后的负责人姓名
const newUserName=ref({})

getlist().then((res) => {
  userName.value=res.data
  userName.value.map(item=>{
    items.value.push({
      text:item.userName,
      value:item.userId
    })
  })
});
//点击跳转
function handleDefine() {
  uni.navigateBack();
}
function onchange(e){
  //获取负责人的姓名
  newUserName.value=e.detail.value[0].text
}
</script>
<style>
.round {
  margin-left: 10px;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid red;
}
.line {
  background: #fff;
  border-bottom: 1px solid #e3d8d8;
  position: relative;
  padding: 24rpx 20rpx 24rpx 150rpx;

  line-height: 36rpx;

  .label {
    position: absolute;
    top: 30rpx;
    left: 0;
    padding: 0 20rpx;
    width: 150rpx;
    color: #999;
  }
  input {
    color: #333;
    line-height: 36rpx;
  }
}
.line1 {
  background: #fff;
  border-bottom: 1px solid #e3d8d8;
}
.label1 {
  line-height: 100rpx;
  height: 100rpx;
  top: 30rpx;
  left: 0;
  padding: 0 20rpx;
  width: 150rpx;
  color: #999;
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
}
</style>
