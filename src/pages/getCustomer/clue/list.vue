<template>
  <view class="clue_list_page">
    <scroll-view class="scroll_box" :scroll-y="true" @scrolltolower="touchGround">
      <checkbox-group @change="batch">
        <view v-for="users in userInfo" :key="users.cuname">
            <view>
              <uni-card :is-shadow="true" shadow="5px 5px 5px 5px rgba(1, 1, 1, 0.08)">
               <view style="display: flex;justify-content: space-between;">
                <view>
                <view class="flex" style="color: #3D3D3D; font-size: 28rpx">
                  <view>客户名称</view>
                  <view>:{{ users.cuname }}</view>
                </view>
                <view class="flex">
                  <view>所选课程</view>
                  <view>:{{ users.cuprod }}</view>
                </view>
                <view class="flex">
                  <view style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
                    >年级</view
                  >
                  <view>:{{ users.cugrade }}</view>
                </view>
                <view class="flex">
                  <view style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
                    >学校</view
                  >
                  <view>:{{ users.cuschool }}</view>
                </view>
                <view class="flex">
                  <view>在校专业</view>
                  <view>:{{ users.cumajor }}</view>
                </view>
               </view>
               <label style="display: flex">
               <view style="margin: auto 0; margin-left: 20rpx">
              <checkbox color="blue" :value="users.id" />
            </view>
          </label>
               </view>
                <view class="btn">
                  <button class="btn-item" size="mini" @click="() => handleReceive(users.id)">领取用户</button>
                </view>
              </uni-card>
            </view>
        </view>
      </checkbox-group>
    </scroll-view>
    <view class="bottom_btn">
      <view @click="handleNew">新建</view>
      <view @click="handleBatch()">批量领取</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getQrCodeReceive, getReceive, batchClue } from "../../../../src/services/getCustomer";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const userInfo = ref([]);
const id = ref();
const num = ref(1);
const total = ref();
const receiveflag = {
  receiveflag: 1,
};
const batchsize = ref();
//获取第一页4条数据
onLoad(() => {
  getQrCodeReceive(num.value).then((res: any) => {
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
//获取多选之后的id
function batch(e) {
  batchsize.value = e.detail.value;
}
//判断触底
function touchGround() {
  if (userInfo.value.length >= total.value) {
    uni.showToast({
      title: "没有更多",
      icon: "none",
    });
  } else {
    num.value = num.value + 1;
    getQrCodeReceive(num.value).then((res) => {
      userInfo.value.forEach((s: any) => {
        res.rows.forEach((v: any, index: any) => {
          if (v.id == s.id) {
            res.rows.splice(index, 1);
          }
        });
      });
      userInfo.value = userInfo.value.concat(res.rows);
    });
  }
}
//批量领取
async function handleBatch() {
  if(!batchsize.value){
    return uni.showToast({
      title: "请勾选",
      icon: "none",
    });
  }
  await batchClue({ ids: batchsize.value });
  num.value = 1;
  getQrCodeReceive(num.value)
    .then((res) => {
      userInfo.value = res.rows;
      total.value = res.total;
    })
    .then(() => {
      uni.showToast({
        icon: "success",
        title: "领取成功",
      });
    });
}
//点击领取按钮
function handleReceive(e) {
  id.value = e;
  console.log(e, id.value);
  getReceive(id.value, { ...receiveflag, id: id.value, receiveflag: 1 });
  console.log("领取成功");
  num.value = 1;
  getQrCodeReceive(num.value)
    .then((res: any) => {
      userInfo.value = res.rows;
      total.value = res.total;
    })
    .then(() => {
      uni.showToast({
        icon: "success",
        title: "领取成功",
      });
    });
}
//点击底部的新建按钮
function handleNew() {
  uni.navigateTo({
    url: "/pages/getCustomer/clue/item",
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
  background-color: #f4f4f4;
}
.scroll_box {
  /* flex: 1; */
  height: calc(100vh - 125rpx);
}
.bottom_btn {
  display: flex;
  justify-content: space-around;
  color: blue;
  /* border-top: 1px solid #e3d8d8; */
  width: 100%;
  height: 120rpx;
  line-height: 120rpx;
  height: 120rpx;
  background-color: #fff;
  font-size: 28rpx;
}
.btn {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 80rpx;
}
.btn-item {
  border: 1rpx solid #158AF7;
  border-radius: 40rpx;
  background-color: #fff;
  color: #158AF7;
  width: 80%;
  line-height: 80rpx;
  font-size: 24rpx;
}
.flex {
  display: flex;
  margin: 10rpx 0;
  color: #9F9F9F;
  font-size: 28rpx;
}
</style>
