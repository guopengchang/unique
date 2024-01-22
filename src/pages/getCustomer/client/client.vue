<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import {
  getClientList,
  updateClientSea,
  addPhoneRecord,
} from "@/services/getCustomer";
import { ref } from "vue";
import dropMenu from "../../component/dropMenu.vue";
import search from "../../component/search.vue";
const clientList = ref([]);
const page = ref(1);
const total = ref(0);
const filters = ref("");
let filter = ref("");
let graphRefs = ref({});

onLoad(() => {
  getClientList(page.value).then((res: any) => {
    clientList.value = res.rows;
    total.value = res.total;
  });
});

function editClient(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/editClient?id=${id}`,
  });
}
function handleFollow() {
  uni.navigateTo({ url: "/pages/getCustomer/follow-up/item" });
}

function handlePayment(id: any) {
  uni.navigateTo({ url: `/pages/getCustomer/payment?id=${id}` });
}

function handleSea(id: any) {
  updateClientSea({ id, cuflag: "0", cuowner: "", receiveflag: "0" }).then(
    () => {
      getClientList().then((res: any) => {
        clientList.value = res.rows;
      });
    }
  );
}

function showDropdown(e: any, item: any) {
  e.stopPropagation();
  closeDropdown(e, item);
  graphRefs.value[item].showDropdown();
}
function closeDropdown(e: any, filters?: any) {
  e.stopPropagation();
  for (let item in graphRefs.value) {
    if (item != filters) {
      graphRefs.value[item].closeDropdown();
    }
  }
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

const setGraphRef = (el: any, item: string) => {
  if (el) {
    graphRefs.value[item] = el;
  }
};

function ReachBottom() {
  if (clientList.value.length >= total.value) {
    uni.showToast({
      title: "没有更多数据",
      icon: "none",
    });
  } else {
    page.value = page.value + 1;
    getClientList(page.value, filter.value).then((res: any) => {
      clientList.value = clientList.value.concat(res.rows);
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
  getClientList(page.value, filter.value).then((res: any) => {
    clientList.value = res.rows;
    total.value = res.total;
  });
}
</script>
<template>
  <view class="screen" @tap.stop="closeDropdown">
    <search
      :filters="filters"
      tips="请输入客户名或手机号"
      @input="handleFilter"></search>
    <scroll-view :scroll-y="true" class="client" @scrolltolower="ReachBottom">
      <view v-for="item in clientList" :key="item">
        <uni-card class="card" :is-shadow="false" :title="item.id">
          <view
            ><text>客户名称:{{ item.cuname }}</text></view
          >
          <view
            ><text>所学课程:{{ item.cuprod }}</text></view
          >
          <view>
            <text>招入老师:{{ item.djpeop }}</text></view
          >
          <view class="btn footer">
            <view class="btn-item" @click="() => editClient(item.id)"
              >编辑
            </view>
            <view class="btn-item" @tap.stop="(e) => showDropdown(e, item.id)">
              更多
            </view>
          </view>
          <dropMenu
            v-on:handle-follow="handleFollow"
            v-on:handle-sea="() => handleSea(item.id)"
            v-on:handle-payment="() => handlePayment(item.id)"
            v-on:handle-call="() => handleCallPhone(item.cutel, item.cuowner)"
            :ref="(el) => setGraphRef(el, item.id)">
          </dropMenu>
        </uni-card>
      </view>
      <view style="height: 60rpx"></view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.screen {
  height: 100vh;
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
:deep(
    .uni-easyinput__content-input
  ) {
  height: 70rpx !important;
}

:deep(.uni-easyinput__content){
  height: 70rpx;
}
</style>
