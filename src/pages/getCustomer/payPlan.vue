<script setup lang="ts">
import { ref } from "vue";
import { getPayPlanList } from "@/services/getCustomer";
import { onLoad} from "@dcloudio/uni-app";
const listData = ref([]);
const page = ref(1);
const total = ref(0);
onLoad(() => {
  getPayPlanList(page.value).then((res: any) => {
    console.log(res);
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
      return;
    }
    if (res.code === 200) {
      if (res.total !== 0) {
        listData.value = res.rows;
        total.value = res.total;
      } else {
        uni.showToast({
          icon: "error",
          title: "数据列表为空或没有权限",
          duration: 3000,
        });
      }
    }
  });
});
function onReachBottom(){
  if (listData.value.length >= total.value) {
    uni.showToast({
      title: "没有更多数据",
      icon: "none",
    });
  } else {
    page.value = page.value + 1;
    getPayPlanList(page.value).then((res: any) => {
      listData.value = listData.value.concat(res.rows);
      total.value = res.total;
    });
  }
}
</script>
<template>
  <scroll-view @scrolltolower="onReachBottom" scroll-y style="background-color: #f4f4f4;height: 100vh;">
    <view style="height: 1rpx"></view>
    <view v-for="item in listData" :key="item.id">
      <uni-card>
        <view class="name">{{ item.cuname }}</view>
        <view class="flex">
          <view>回款期数</view>
          <view>{{ item.termmoney }}</view>
        </view>
        <view class="flex">
          <view>回款金额</view>
          <view>{{ item.planmoney }}</view>
        </view>
        <view class="flex">
          <view>回款日期</view>
          <view>{{ item.moneydate }}</view>
        </view>
        <view class="flex">
          <view>回款方式</view>
          <view>{{ item.waymoney }}</view>
        </view>
        <view class="flex">
          <view>对接人</view>
          <view>{{ item.cuowner }}</view>
        </view>
      </uni-card>
    </view>
    <view style="height: 20rpx"></view>
  </scroll-view>
</template>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  margin: 10rpx 0;
  color: #7F7F81;
  font-size: 28rpx;
}
.name {
  border-bottom: 2px solid #d8d8d8;
  margin: 20rpx 0;
  padding-bottom: 20rpx;
  font-weight: bold;
  color: #3D3D3D;
  font-size: 36rpx;
}
</style>
