<template>
  <view v-for="users in userInfo">
    <uni-card :is-shadow="false" :title="users.id">
      <view
        ><text>客户名称:{{ users.cuname }}</text></view
      >
      <view
        ><text>所学课程:{{ users.cuprod }}</text></view
      >
      <view>
        <text>招入老师:{{ users.djpeop }}</text></view
      >
      <view class="btn">
        <button class="btn-item" size="mini" @click="() => handleEdit(users.id)">编辑</button>
        <button class="btn-item" size="mini" @click="handleFollow(users.id)">跟进</button>
        <button class="btn-item" size="mini" @click="handleClient">转客户</button>
      </view>
    </uni-card>
  </view>
</template>
<script setup>
import { uni } from "@dcloudio/uni-h5";
import { getQrCode, getChange } from "../../../../src/services/getCustomer";
import { ref } from "vue";
//存放数据
const userInfo = ref({});
//获取id
const id = ref();
//获取数据
getQrCode().then((res) => {
  console.log(res)
  userInfo.value = res.rows;
  id.value = res.rows[0].id;
  console.log(res);
});
//点击编辑按钮
function handleEdit(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/hopper/editor?id=${id}`,
  });
}
// 点击跟进按钮
function handleFollow(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/follow-up/item?id=${id}`,
  });
}
// 点击转客户按钮
function handleClient() {
  getChange({ cuflag: 2, id: id.value });
  console.log("成功转入");
  uni.navigateTo({
    url:"/pages/getCustomer/hopper/list"
  })
}
</script>
<style scoped>
.btn {
  display: flex;
  margin-top: 20rpx;
  height: 80rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 40%;
  line-height: 80rpx;
}
</style>