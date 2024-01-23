<template>
  <view class="clue_list_page">
    <scroll-view class="scroll_box" :scroll-y="true">
      <view v-for="users in userInfo">
        <view>
          <uni-card :is-shadow="false">
            <view style="font-size: 40rpx">
              <text style="width: 240rpx; display: inline-block; text-align: justify; text-align-last: justify"
                >客户名称</text
              ><text>:{{ users.cuname }} </text>
            </view>
            <view style="font-size: 40rpx; margin: 20rpx 0">
              <text style="width: 240rpx; display: inline-block; text-align: justify; text-align-last: justify"
                >跟进电话</text
              ><text>:{{ users.cutel }} </text>
            </view>
            <view style="font-size: 40rpx">
              <text style="width: 240rpx; display: inline-block; text-align: justify; text-align-last: justify"
                >最近跟进日期</text
              ><text>:{{ users.inseDate }} </text>
            </view>
          </uni-card>
        </view>
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
      uni.showToast({ icon: "success", title: res.msg });
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
page {
  height: 100%;
}
.clue_list_page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.scroll_box {
  height: calc(100% - 125rpx);
}
.btn {
  /* display: flex; */
  margin-top: 20px;
  height: 80rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 33%;
  line-height: 80rpx;
}
</style>
