<template>
  <view class="clue_list_page">
    <view>
      <uni-search-bar
        radius="100"
        placeholder="按名字或手机号搜索"
        clearButton="none"
        cancelButton="none"
        @confirm="search"
      />
    </view>
    <scroll-view class="scroll_box" :scroll-y="true" @scrolltolower="scrolltolower">
      <view v-for="users in userInfo">
        <view style="width: 750rpx">
          <uni-card :is-shadow="false">
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
              <text>客户手机号:{{ users.cutel }}</text></view
            >
            <view class="btn">
              <button class="btn-item" size="mini" @click="() => handleEdit(users.id)">编辑</button>
              <button class="btn-item" size="mini" @click="handleFollow(users.id)">跟进</button>
              <button class="btn-item" size="mini" @click="handleClient(users.id)">转客户</button>
            </view>
          </uni-card>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { getHopper, getChange, getHopperSearch } from "../../../../src/services/getCustomer";
import { ref, onMounted } from "vue";
let inputValueFlag = false;
//存放数据
const userInfo = ref([]);
//total
const total = ref();
//
const num = ref(1);

onMounted(() => {
  //页面初始化 第一次获取数据
  getHopper().then((res) => {
    console.log(res);
    userInfo.value = res.rows;
    total.value = res.total;
  });
});

//点击编辑按钮
function handleEdit(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/hopper/editor?id=${id}`,
  });
}
// 点击跟进按钮
function handleFollow(id) {
  uni.navigateTo({
    url: `/pages/getCustomer/follow-up/item?id=${id}`,
  });
}
// 点击转客户按钮
function handleClient(id) {
  getChange({ cuflag: 2, id: id });
  uni.navigateTo({
    url: "/pages/getCustomer/hopper/list",
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
    getHopper(num.value).then((res) => {
      userInfo.value = userInfo.value.concat(res.rows);
      console.log(res.rows);
    });
  }
}

function search(e) {
  if (e.value) {
    inputValueFlag = true;
  } else {
    getHopper().then((res) => {
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
    }).then((res) => {
      console.log(res,11111)
      userInfo.value = res.rows;
    });
  } else {
    getHopperSearch({
      cuname: e.value,
    }).then((res) => {
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
</style>