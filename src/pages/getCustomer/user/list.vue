<template>
  <view class="screen">
    <search
      :filters="filters"
      placeholder="请输入客户名或手机号"
      @input="handleFilter"></search>
    <scroll-view scroll-y class="client" @scrolltolower="ReachBottom">
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
          <view>
            <text>负责人:{{ users.cuowner }}</text></view
          >
          <view class="btn">
            <button
              class="btn-item"
              size="mini"
              @click="() => handleDeal(users.id)">
              分配用户
            </button>
          </view>
        </uni-card>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { getQrCodeUser } from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import search from "../../component/search.vue";

//存放网络层返回的数据
const userInfo = ref<any>({});
const total = ref(0);
const page = ref(1);
let filter = ref("");
const filters = ref("");

onLoad(() => {
  getQrCodeUser(page.value).then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
  });
});

function ReachBottom() {
  if (userInfo.value.length >= total.value) {
    uni.showToast({
      title: "没有更多数据",
      icon: "none",
    });
  } else {
    page.value = page.value + 1;
    getQrCodeUser(page.value, filter.value).then((res: any) => {
      userInfo.value = userInfo.value.concat(res.rows);
      total.value = res.total;
    });
  }
}

function handleFilter(e: any) {
  if (/^[\d]+$/.test(e)) {
    filter.value = `&cutel=${e}`;
  } else {
    filter.value = `&cuname=${e}`;
  }
  page.value = 1;
  getQrCodeUser(page.value, filter.value).then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
  });
}

// 点击跳转
function handleDeal(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/user/item?id=${id}`,
  });
}
</script>
<style scoped>

.screen {
  height: calc(100vh - 44rpx);
}
.client {
  height: calc(100vh - 104rpx);
}
.btn {
  display: flex;
  margin-top: 20rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
}
</style>
