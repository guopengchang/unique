<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import {
  getClientList,
  updateClientSea,
  addPhoneRecord,
} from "@/services/getCustomer";
import { ref } from "vue";
import search from "../../component/search.vue";
const clientList = ref([]);
const page = ref(1);
const total = ref(0);
const filters = ref("");
const popupMore = ref(null);
const client = ref<any>({});
let filter = ref("");
onLoad(() => {
  getClientList().then((res: any) => {
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
    }
    if (res.code === 200) {
      if (res.total !== 0) {
        clientList.value = res.rows;
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
function editClient(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/editClient?id=${id}`,
  });
}
function handleFollow(id: any) {
  uni.navigateTo({ url: "/pages/getCustomer/follow-up/item?id=" + id });
}
function handlePayment(id: any) {
  uni.navigateTo({ url: `/pages/getCustomer/payment?id=${id}` });
}
function handleSea(pop: any, id: any) {
  updateClientSea({ id, cuflag: "0", cuowner: "", receiveflag: "0" })
    .then(
      getClientList().then((res: any) => {
        console.log(res)
        clientList.value = res.rows;
      })
    )
    .then(() => {
      closePop(pop);
    })
    .then(() => {
      uni.showToast({
        icon: "success",
        title: "移入成功",
      });
    });
}
function handleCallPhone(tel: any, owner: any) {
  uni.makePhoneCall({
    phoneNumber: tel,
    success: (result) => {
      console.log(result);
      addPhoneRecord({ cuowner: owner, calltel: tel });
    },
    fail: (error) => {
      console.log(error);
    },
  });
}
function ReachBottom() {
  if (clientList.value.length >= total.value) {
    uni.showToast({
      title: "没有更多数据",
      icon: "none",
    });
  } else {
    page.value = page.value + 1;
    getClientList(filter.value,page.value).then((res: any) => {
      clientList.value.forEach((s: any) => {
        res.rows.forEach((v: any, index: any) => {
          if (v.id == s.id) {
            res.rows.splice(index, 1);
          }
        });
      });
      clientList.value = clientList.value.concat(res.rows);
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
  
  console.log(filter);
  getClientList(filter.value).then((res: any) => {
    clientList.value = res.rows;
    total.value = res.total;
  });
}
function setClientID(popup: any, item: any) {
  client.value = item;
  openPop(popup);
}
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
}
</script>
<template>
  <view class="screen">
    <search
      :filters="filters"
      tips="请输入客户名或手机号"
      @input="handleFilter"></search>
    <scroll-view :scroll-y="true" class="client" @scrolltolower="ReachBottom">
      <view v-for="item in clientList" :key="item.id">
        <uni-card class="card" :is-shadow="false">
          <view>
            <text>客户名称:{{ item.cuname }}</text>
          </view>
          <view>
            <text>所学课程:{{ item.cuprod }}</text>
          </view>
          <view>
            <text>招入老师:{{ item.djpeop }}</text>
          </view>
          <view class="btn footer">
            <view class="btn-item" @click="() => editClient(item.id)"
              >编辑
            </view>
            <view class="btn-item" @click="() => setClientID(popupMore, item)">
              更多
            </view>
          </view>
        </uni-card>
      </view>
      <uni-popup ref="popupMore" type="bottom">
        <view class="popm">
          <view class="btnI" @click="() => handleFollow(client.id)">
            <image
              class="img"
              src="../../../static/management-pic/clue.png"
              mode="scaleToFill" />
            <view>写跟进</view>
          </view>
          <view class="btnI" @click="() => handleSea(popupMore, client.id)">
            <image
              class="img"
              src="../../../static/management-pic/clue.png"
              mode="scaleToFill" />
            <view>移入公海</view>
          </view>
          <view class="btnI" @click="() => handlePayment(client.id)">
            <image
              class="img"
              src="../../../static/management-pic/clue.png"
              mode="scaleToFill" />
            <view>新建回款</view>
          </view>
          <view
            class="btnI"
            @click="() => handleCallPhone(client.cutel, client.cuowner)">
            <image
              class="img"
              src="../../../static/management-pic/clue.png"
              mode="scaleToFill" />
            <view>拨打电话</view>
          </view>
        </view>
      </uni-popup>
      <view style="height: 60rpx"></view>
    </scroll-view>
  </view>
</template>
<style lang="scss" scoped>
.img {
  width: 70rpx;
  height: 70rpx;
  margin-bottom: 20rpx;
}
.popm {
  height: 20vh;
  width: 100%;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  background-color: #fffefe;
  display: flex;
}
.btnI {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
}
.screen {
  height: 100vh;
  background-color: #f4f4f4;
}
.client {
  height: calc(100vh - 100rpx);
}
.statistics {
  width: 15rpx;
  height: 15rpx;
}
.title {
  border-bottom: 0.5rpx solid #000;
}
.footer {
  border-top: 0.5rpx solid #e0e0e0;
}
.btn {
  padding-top: 10rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
}
.btn-item {
  border: 1rpx solid #007aff;
  border-radius: 3rpx;
  padding: 0 10rpx;
  color: #007aff;
}
:deep(.uni-card) {
  overflow: visible;
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
