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
function handlePayment(id: any,name:any) {
  uni.navigateTo({ url: `/pages/getCustomer/payment?id=${id}&name=${name}` });
}
function handleSea(pop: any, id: any) {
  updateClientSea({ id, cuflag: "0", cuowner: "", receiveflag: "0" })
    .then(
      getClientList().then((res: any) => {
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
    <scroll-view class="client" :scroll-y="true" @scrolltolower="ReachBottom">
      <uni-card v-for="users in clientList" :is-shadow="false" >
        <view>
          <view class="card-box">
            <view style="margin-bottom: 20rpx">
              <text style="font-size: 36rpx; font-weight: bold;color: #3D3D3D;;">{{ users.cuname }}</text>
              <text style="margin-left: 20rpx; font-size: 20rpx; color: #B0B0B4">{{ users.cuschool }}</text></view
            >
            <view class="btn-edit" @click="() => editClient(users.id)">编辑 </view>
          </view>
          <view style="margin-top: 10rpx;color: #7F7F81;font-size: 24rpx;">
            <text
              >联系方式<text>:{{ users.cutel }}</text>
            </text>
          </view>
          <view style="display: flex; justify-content: space-between">
            <view>
              <view style="color: #7F7F81;font-size: 24rpx;">
                <text
                  style="
                    margin: 10rpx 0;
                    width: 110rpx;
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                  "
                  >专业
                </text>
                <text>:{{ users.cumajor }}</text>
              </view>
              <view style="color: #7F7F81;font-size: 24rpx;">
                <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
                  >对接人
                </text>
                <text>:{{ users.cuowner }}</text>
              </view>
            </view>
            <view
              style="margin-right: -20rpx"
              class="btnI"
              @click="() => handleCallPhone(client.cutel, client.cuowner)"
            >
              <image class="img" src="../../../static/more-pic/phone.png" mode="scaleToFill" />
            </view>
          </view>
        </view>

        <view class="btn">
          <view style="margin-left: auto" class="btn-more" @click="() => setClientID(popupMore, users)"> 更多 </view>
        </view>
      </uni-card>
      <view style="height: 30rpx;"></view>
      <uni-popup ref="popupMore" type="bottom">
        <view class="popm">
          <view class="btnI" @click="() => handleFollow(client.id)">
            <image class="img" src="../../../static/more-pic/follow.png" mode="scaleToFill" />
            <view>写跟进</view>
          </view>
          <view class="btnI" @click="() => handleSea(popupMore, client.id)">
            <image class="img" src="../../../static/more-pic/user.png" mode="scaleToFill" />
            <view>移入公海</view>
          </view>
          <view class="btnI" @click="() => handlePayment(client.id,client.cuname)">
            <image class="img" src="../../../static/more-pic/user.png" mode="scaleToFill" />
            <view>新建回款</view>
          </view>
          <view class="btnI" @click="() => handleCallPhone(client.cutel, client.cuowner)">
            <image class="img" src="../../../static/more-pic/phone.png" mode="scaleToFill" />
            <view>拨打电话</view>
          </view>
        </view>
      </uni-popup>
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
.btn {
  padding-top: 10rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
}
.btn-more {
  border: 1rpx solid #158AF7;
  width: 100rpx;
  text-align: center;
  border-radius: 30rpx;
  padding: 0 10rpx;
  color: #158AF7;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 20rpx;
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

.card-box {
  border-bottom: 1rpx solid #d8d8d8;
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
}
.btn-edit {
  margin-bottom: 20rpx;
  border: 1rpx solid #e4e4e4;
  width: 100rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius: 30rpx;
  padding: 0 10rpx;
  color: #9F9F9F;
  font-size: 20rpx;
}
</style>
