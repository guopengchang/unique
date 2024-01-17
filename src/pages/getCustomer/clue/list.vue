<template>
  <view v-for="users in userInfo">
    <uni-card  :is-shadow="false" :title=users.id>
      <view
        ><text >客户名称:{{ users.cuname }}</text></view
      >
      <view
        ><text >所学课程:{{ users.cuprod }}</text></view
      >
      <view>
        <text >招入老师:{{ users.djpeop }}</text></view
      >
      <view class="btn">
        <button class="btn-item" size="mini" @click="handleReceive" >领取用户</button>
        <button class="btn-item" size="mini" @click="handleDeal">跟进用户</button>
      </view>
    </uni-card>
  </view>

  <view class="a" style="display: flex; justify-content: space-around">
    <view @click="handleNew">新建</view>
    <view>更多</view>
  </view>
</template>
<script setup>
import { getQrCode } from "../../../../src/services/getCustomer";
import { ref } from "vue";
const userInfo = ref({});


//获取数据
getQrCode().then((res) => {
  userInfo.value = res.rows;

  console.log(res);
});
//点击跟进按钮
function handleDeal() {
  uni.navigateTo({
    url: "/pages/getCustomer/follow-up/list",
  });
}
//点击领取按钮
function handleReceive(){
  console.log("领取成功")
}
//点击底部的新建按钮
function handleNew() {
  uni.navigateTo({
    url: "/pages/getCustomer/clue/item",
  });
}

</script>
<style>
.a {
  color: blue;
  border-top: 1px solid #e3d8d8;
  width: 100%;
  position: fixed;
  line-height: 120rpx;
  height: 120rpx;
  bottom: 0;
 
}
.btn {
  display: flex;
  margin-top: 20px;
  height: 80rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 40%;
  line-height: 80rpx;
}
</style>
