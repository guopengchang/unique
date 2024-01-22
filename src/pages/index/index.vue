<template>
  <view class="content"  :style="{ marginTop:` ${top}px` }">
    <uni-card title="获客管理" class="card_box">
    <view class="card"  v-for="(item, index) in getCustomerList"
       :key="index + item.name">
      <navigator
        hover-class="none"
        class="navigator-item"
        :url="`${item.path}`">
        <image class="image" mode="aspectFill" :src="item.icon"></image>
        <view class="name"> {{ item.name }} </view>
      </navigator>
    </view>
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
import payPlan from "@/static/management-pic/payPlan.png"

// 获取屏幕边界到安全区域距离
const { safeAreaInsets  } = uni.getSystemInfoSync() ;
const top = safeAreaInsets?.top ||0;
import followUp from "@/static/management-pic/followUp.png"
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
  {
    path: "/pages/getCustomer/payPlan",
    icon: payPlan,
    name: "回款计划",
  },
  {
    path: "/pages/getCustomer/follow-up/list",
    icon: followUp,
    name: "跟进列表",
  },
]);
</script>

<style lang="scss">
.content {
  .card{
    width: 25%;
    height: 200rpx;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .navigator-item {
    text-align: center;
    .image {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 15rpx;
    }
  }

}



</style>