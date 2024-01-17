<template>
    <view>
      <form class="box">
        <view class="line">
          <view class="label"> 客户名称 </view>
          <input name="name" />
        </view>
        <view class="line">
          <view class="label"> 助记名称 </view>
          <input name="phone" />
        </view>
        <view class="line">
          <view class="label"> 姓名 </view>
          <input name="detailAddress" />
        </view>
  
        <view class="line">
          <view class="label"> 手机号 </view>
          <input name="detailAddress" />
        </view>
        <view class="line">
          <view class="label">客户所属</view>
          <uni-data-picker placeholder="请选择客户所属"> </uni-data-picker>
        </view>
        <view class="line">
          <view class="label">客户状态</view>
          <uni-data-picker placeholder="请选择客户状态"> </uni-data-picker>
        </view>
  
        <view class="line">
          <view class="label">客户来源</view>
          <uni-data-picker placeholder="请选择客户来源"> </uni-data-picker>
        </view>
  
        <view class="line">
          <view>
            <view class="label">家庭地址</view>
            <uni-data-picker placeholder="请选择家庭地址"> </uni-data-picker>
          </view>
  
          <uni-easyinput type="textarea" autoHeight placeholder="填写详细地址"></uni-easyinput>
        </view>
        <view class="line">
          <view class="label"> 备注信息</view>
          <uni-easyinput type="textarea" autoHeight placeholder="请输入备注信息"></uni-easyinput>
        </view>
        <view class="line">
          <view>
            <view class="label">提醒人</view>
            <input name="phone" />
          </view>
        </view>
        <view class="line">
          <view>
            <view class="label">团队:</view>
            <input name="phone" />
          </view>
        </view>
        <view class="op">
          <button class="confirm"  @click="handleNew">确认</button>
        </view>
      </form>
    </view>
  </template>
  <script setup>
  //点击确认跳转
 function handleNew() {
  uni.navigateBack()
 }
  </script>
  <style scoped lang="scss">
  .box {
    font-size: 28rpx;
    background: #fff;
  
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
    border: 1px solid #ccc;
    box-shadow: 0 6rpx 12rpx 0 rgb(0 0 0 / 5%);
    color: #333;
  }
}
  }
  </style>
  