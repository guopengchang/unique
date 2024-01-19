<template>
  <view v-for="users in userInfo">
    <uni-card :is-shadow="false" :title=users.id>
      <view
        ><text>客户名称:{{ users.cuname }}</text></view
      >
      <view
        ><text>所学课程:{{ users.cuprod }}</text></view
      >
      <view>
        <text>招入老师:{{ users.djpeop }}</text></view
      >
      <view>
        <text>负责人:{{ users.cuowner }}</text></view
      >
      <view class="btn">
        <button class="btn-item" size="mini" @click="() => handleDeal(users.id)">分配用户</button>
      </view>
    </uni-card>
  </view>
</template>
<script setup>
import { getQrCodeUser } from "../../../../src/services/getCustomer";
import { ref } from "vue";

//存放网络层返回的数据
const userInfo = ref({});

getQrCodeUser().then((res) => {
  userInfo.value = res.rows;
  console.log(res)
});
// 点击跳转
function handleDeal(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/user/item?id=${id}`,
  });
}
</script>
<style lang="scss" scoped>
.btn {
  display: flex;
  margin-top: 20px;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
}
</style>
