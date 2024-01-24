<script setup lang="ts">
import { ref } from "vue";
import { getPayPlanList } from "@/services/getCustomer";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
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
onReachBottom(() => {
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
});
</script>
<template>
  <view class="screen">
    <view style="height: 1rpx"></view>
    <view v-for="item in listData" :key="item.id">
      <uni-card>
        <view>
          <text>回款期数：{{ item.termmoney }}</text>
        </view>
        <view>
          <text>回款金额:{{ item.planmoney }}</text>
        </view>
        <view>
          <text>回款日期:{{ item.moneydate }}</text>
        </view>
        <view>
          <text>回款方式:{{ item.waymoney }}</text>
        </view>
      </uni-card>
    </view>
    <view style="height: 10rpx"></view>
  </view>
</template>
<style scoped>
.screen{
  background-color: #f4f4f4;
  height: 100vh;
}
</style>
