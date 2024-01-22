<template>
  <view class="clue_list_page">
    <scroll-view class="scroll_box" :scroll-y="true" @scrolltolower="scrolltolower">
      <view v-for="users in userInfo">
        <view>
          <uni-card :is-shadow="false">
            <view
              ><text>客户名称:{{ users.cuowner }}</text></view
            >
            <view
              ><text>跟进方式:{{ users.followtype }}</text></view
            >
            <view>
              <text>跟进内容:{{ users.followcont }}</text></view
            >
          </uni-card>
        </view>
      </view>
    </scroll-view>
  </view>

 
</template>
<script setup>
import { getQrCode, followlist } from "../../../../src/services/getCustomer";
import { ref } from "vue";

const userInfo = ref({});

getQrCode().then((res) => {
  userInfo.value = res.data;
  console.log(res);
});

// followlist().then((res) => {
//   userInfo.value = res.rows;
//   console.log(res);
// });

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