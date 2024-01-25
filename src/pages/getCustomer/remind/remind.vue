<template>
  <view style="background-color: #f9f9f9; height: 100vh">
    <scroll-view :scroll-y="true">
      <view v-for="users in userInfo">
        <uni-card class="card-box" :is-shadow="true" shadow="5px 5px 5px 5px rgba(1, 1, 1, 0.08)">
          <view>
            <view class="mini-box"></view>
            <view style="display: flex; justify-content: space-between">
              <view style="margin-left: 20rpx">
                <view style="margin: 10rpx; color: #3D3D3D;font-size:28rpx;">
                  <text>客户名称</text><text>: &nbsp;{{ users.cuname }} </text>
                </view>
                <view style="margin: 10rpx; color: #9f9f9f;font-size:28rpx;">
                  <text>跟进方式</text><text>: &nbsp;{{ users.cutel }} </text>
                </view>
                <view style="margin: 10rpx; color: #9f9f9f;font-size:28rpx;">
                  <text>跟进内容</text>
                  <text>:{{ users.inseDate }} </text>
                </view>
              </view>
              <view class="right-item">待处理</view>
            </view>
          </view>
        </uni-card>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { remind } from "../../../../src/services/getCustomer";
import { ref } from "vue";
const userInfo: any = ref({});
remind().then((res: any) => {
  console.log(res);
  if (res.code !== 200) {
    uni.showToast({ icon: "none", title: res.msg });
  }
  if (res.code === 200) {
    if (res.data.length !== 0) {
      userInfo.value = res.data;
    } else {
      uni.showToast({
        icon: "error",
        title: "数据列表为空或没有权限",
        duration: 3000,
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.mini-box {
  background-color: #158af7;
  height: 80rpx;
  width: 25rpx;
  position: absolute;
  top: 25%;
  left: 0rpx;
}
.right-item {
  margin: auto 0;
  border: 2rpx solid #158AF7;
  width: 130rpx;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  border-radius: 10rpx;
  color: #158AF7;
  margin-right: -20rpx;
  font-size: 28rpx;
}
</style>
