<template>
  <view v-for="users in userInfo">
    <uni-card class="card" :is-shadow="false" :title=users.id>
      <view
        ><text class="uni-body">客户名称:{{ users.cuname }}</text></view
      >
      <view
        ><text class="uni-body">所学课程:{{ users.cuprod }}</text></view
      >
      <view>
        <text class="uni-body">招入老师:{{ users.djpeop }}</text></view
      >
     
    </uni-card>
  </view>

  <view class="a" style="display: flex; justify-content: space-around">
    <view @click="handleNew">新建</view>
    <view>更多</view>
  </view>
</template>
<script setup>
import { getQrCode, followlist } from "../../../../src/services/getCustomer";
import { ref } from "vue";

const userInfo = ref({});

getQrCode().then((res) => {
  userInfo.value = res.rows;
  console.log(res)
});

followlist().then((res) => {
  console.log(res);
});
function handleNew() {
  uni.navigateTo({
    url: "/pages/getCustomer/follow-up/item",
  });
}
</script>
<style lang="scss" scoped>
.a {
  color: blue;
  border-top: 1rpx solid #e3d8d8;
  width: 100%;
  position: fixed;
  line-height: 120rpx;
  height: 120rpx;
  bottom: 0;
}
</style>
