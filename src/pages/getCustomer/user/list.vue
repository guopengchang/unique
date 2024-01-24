<template>
  <view class="screen">
    <search
      :filters="filters"
      tips="请输入客户名或手机号"
      @input="handleFilter"></search>
    <scroll-view scroll-y class="client" @scrolltolower="ReachBottom">
      <view v-for="users in userInfo" :key="users.id">
        <uni-card
          :is-shadow="true"
          shadow="5px 5px 5px 5px rgba(1, 1, 1, 0.08)">
          <view>
            <text
              >客户名称<text>:{{ users.cuname }}</text>
            </text>
          </view>
          <view>
            <text
              >所选课程<text>:{{ users.cuprod }}</text>
            </text>
          </view>
          <view>
            <text
              style="
                width: 110rpx;
                display: inline-block;
                text-align: justify;
                text-align-last: justify;
              "
              >年级
            </text>
            <text>:{{ users.cugrade }}</text>
          </view>
          <view>
            <text
              style="
                width: 110rpx;
                display: inline-block;
                text-align: justify;
                text-align-last: justify;
              "
              >学校
            </text>
            <text>:{{ users.cuschool }}</text>
          </view>
          <view>
            <text
              >在校专业<text>:{{ users.cumajor }}</text>
            </text>
          </view>
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
      <div style="height: 20rpx"></div>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { getQrCodeUser } from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import search from "../../component/search.vue";
//存放网络层返回的数据
const userInfo = ref<any>({});
const total = ref(0);
const page = ref(1);
let filter = ref("");
const filters = ref("");
onLoad(() => {
  getQrCodeUser(page.value).then((res: any) => {
    console.log(res);
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
    }
    if (res.code === 200) {
      if (res.total !== 0) {
        userInfo.value = res.rows;
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
onShow(() => {
  page.value = 1;
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
  if (!e) {
    filter.value = "";
  } else {
    if (/^[\d]+$/.test(e)) {
      filter.value = `&cutel=${e}`;
    } else {
      filter.value = `&cuname=${e}`;
    }
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
<style lang="scss" scoped>
.screen {
  height: 100vh;
  background-color: #f4f4f4;
}
.client {
  height: calc(100vh - 100rpx);
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
:deep(.uni-easyinput) {
  padding-left: 30rpx;
  padding-right: 30rpx;
  width: auto !important;
  padding-top: 20rpx;
  padding-bottom: 10rpx;
}
:deep(.uni-easyinput__content-input) {
  height: 70rpx !important;
}
:deep(.uni-easyinput__content) {
  height: 70rpx;
}
</style>
