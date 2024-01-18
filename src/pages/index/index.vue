<template>
  <view class="content">
    <uni-card title="获客管理" class="card">
      <navigator
        class="navigator-item"
        v-for="(item, index) in getCustomerList"
        :key="index + item.name"
        :url="`${item.path}`">
        <image class="image" mode="aspectFill" :src="item.icon"></image>
        <view class="name"> {{ item.name }} </view>
      </navigator>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");
import signIn from "@/static/management-pic/register.png";
import clue from "@/static/management-pic/clue.png";
import user from "@/static/management-pic/HighSeasCustomer.png";
import client from "@/static/management-pic/customer.png";
import hopper from "@/static/management-pic/hopper.png";
// 猜你喜欢的列表
const getCustomerList = ref<any[]>([
  {
    path: "/pages/getCustomer/signIn",
    icon: signIn,
    name: "签到",
  },
  {
    path: "/pages/getCustomer/clue/list",
    icon: clue,
    name: "线索",
  },
  {
    path: "/pages/getCustomer/user/list",
    icon: user,
    name: "公海客户",
  },
  {
    path: "/pages/getCustomer/hopper/list",
    icon: hopper,
    name: "漏斗",
  },
  {
    path: "/pages/getCustomer/client/client",
    icon: client,
    name: "客户",
  },
]);
</script>

<style lang="scss">
.content {
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
  .navigator-item {
    width: 25%;
    height: 200rpx;
    display: inline-block;
    .image {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
