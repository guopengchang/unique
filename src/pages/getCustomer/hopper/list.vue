<template>
 <view class="clue_list_page screen">
    <uni-search-bar
      style="margin: auto 20rpx"
      radius="100"
      placeholder="按名字或手机号搜索"
      clearButton="none"
      cancelButton="none"
      @confirm="search"
    />
    <scroll-view class="scroll_box" :scroll-y="true" @scrolltolower="scrolltolower">
      <uni-card v-for="users in userInfo" :is-shadow="false">
        <view>
          <view class="card-box">
            <view style="margin-bottom: 20rpx">
              <text style="font-size: 36rpx; font-weight: bold;color: #3D3D3D;">{{ users.cuname }}</text>
              <text style="margin-left: 20rpx; font-size: 20rpx; color: #B0B0B4">{{ users.cuschool }}</text></view
            >
            <view class="btn-edit" @click="() => handleEdit(users.id)">编辑 </view>
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
              style="margin-right: -50rpx"
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
          <view class="btnI" @click="() => handleClient(popupMore, client.id)">
            <image class="img" src="../../../static/more-pic/user.png" mode="scaleToFill" />
            <view>转为客户</view>
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
<script setup lang="ts">
import {
  getHopper,
  getChange,
  getHopperSearch,
  addPhoneRecord,
} from "../../../../src/services/getCustomer";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
let inputValueFlag = false;
//存放数据
const userInfo = ref([]);
//total
const total = ref();
//
const num = ref(1);
//
const client = ref<any>({});
//
const popupMore = ref(null);
onLoad(() => {
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
async function handleClient(pop: any, id: any) {
  await getChange({ cuflag: 2, id: id });
  getHopper()
    .then((res: any) => {
      userInfo.value = res.rows;
      total.value = res.total;
    })
    .then(() => {
      closePop(pop);
    })
    .then(() => {
      uni.showToast({
        icon: "success",
        title: "转客户成功",
      });
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

function setClientID(popup: any, item: any) {
  console.log(item);
  client.value = item;
  openPop(popup);
}
function openPop(popup: any) {
  popup.open();
}
function closePop(popup: any) {
  popup.close();
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
  width: 33.33%;
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
