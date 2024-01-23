<template>
  <view class="clue_list_page">
    <!-- <scroll-view class="scroll_box" :scroll-y="true"> -->
      <view v-for="users in userInfo">
        <view>
          <uni-card :is-shadow="false">
            <view>
              <text>客户名称:{{ users.cuowner }}</text>
            </view>
            <view>
              <text>跟进方式:{{ users.followtype }}</text>
            </view>
            <view>
              <text>跟进内容:{{ users.followcont }}</text>
            </view>
          </uni-card>
        </view>
      </view>
    <!-- </scroll-view> -->
  </view>
</template>
<script setup lang="ts">
import { getQrCode } from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const userInfo: any = ref({});
onLoad(() => {
  getQrCode().then((res: any) => {
    console.log(res);
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
    }
    if (res.code === 200) {
      if (res.data.length !== 0) {
        userInfo.value = res.data;
        uni.showToast({ icon: "success", title: "查询成功" });
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
  background-color: #f4f4f4;
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
