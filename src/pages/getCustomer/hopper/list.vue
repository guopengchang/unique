<template>
  <view class="clue_list_page">
    <uni-search-bar
      style="margin: auto 20rpx"
      radius="100"
      placeholder="按名字或手机号搜索"
      clearButton="none"
      cancelButton="none"
      @confirm="search" />
    <scroll-view
      class="scroll_box"
      :scroll-y="true"
      @scrolltolower="scrolltolower">
      <uni-card
        v-for="users in userInfo"
        :is-shadow="false"
        style="margin: auto 20rpx">
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
            @click="() => handleEdit(users.id)">
            编辑
          </button>
          <button class="btn-item" size="mini" @click="handleFollow(users.id)">
            跟进
          </button>
          <button class="btn-item" size="mini" @click="handleClient(users.id)">
            转客户
          </button>
        </view>
      </uni-card>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import {
  getHopper,
  getChange,
  getHopperSearch,
} from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
let inputValueFlag = false;
//存放数据
const userInfo = ref([]);
//total
const total = ref();
//
const num = ref(1);
onShow(() => {
  //页面初始化 第一次获取数据
  getHopper().then((res: any) => {
    console.log(res);
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
    }
    if (res.code === 200) {
      if (res.total !== 0) {
        userInfo.value = res.rows;
        total.value = res.total;
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
});
//点击编辑按钮
function handleEdit(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/hopper/editor?id=${id}`,
  });
}
// 点击跟进按钮
function handleFollow(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/follow-up/item?id=${id}`,
  });
}
// 点击转客户按钮
async function handleClient(id: any) {
  await getChange({ cuflag: 2, id: id });
  getHopper().then((res: any) => {
    console.log(res);
    userInfo.value = res.rows;
    total.value = res.total;
  });
}
// 触底
function scrolltolower() {
  if (inputValueFlag) {
    //搜索框，有值
    return;
  }
  //搜索框，没有值
  if (userInfo.value.length >= total.value) {
    uni.showToast({
      title: "没有更多",
      icon: "none",
    });
  } else {
    num.value = num.value + 1;
    console.log(num.value);
    getHopper(num.value).then((res: any) => {
      userInfo.value = userInfo.value.concat(res.rows);
      console.log(res.rows);
    });
  }
}
function search(e: any) {
  if (e.value) {
    inputValueFlag = true;
  } else {
    getHopper().then((res: any) => {
      console.log(res);
      userInfo.value = res.rows;
      total.value = res.total;
    });
    inputValueFlag = false;
    return;
  }
  let isPhone = !Number.isNaN(Number(e.value)) ? true : false;
  if (isPhone) {
    getHopperSearch({
      cutel: e.value,
    }).then((res: any) => {
      console.log(res, 11111);
      userInfo.value = res.rows;
    });
  } else {
    getHopperSearch({
      cuname: e.value,
    }).then((res: any) => {
      userInfo.value = res.rows;
    });
  }
}
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
body,
uni-page-body {
  background-color: #ededed;
}
</style>
