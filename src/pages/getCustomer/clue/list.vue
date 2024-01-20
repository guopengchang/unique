<template>
  <view class="clue_list_page">
    <scroll-view
      class="scroll_box"
      :scroll-y="true"
      @scrolltolower="touchGround">
      <checkbox-group @change="batch">
        <view v-for="users in userInfo" :key="users.cuname">
          <label style="display: flex">
            <view style="margin: auto 0; margin-left: 20rpx">
              <checkbox :value="users.id" />
            </view>

            <view style="width: 1000rpx">
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
                <view class="btn">
                  <button
                    class="btn-item"
                    size="mini"
                    @click="() => handleReceive(users.id)">
                    领取用户
                  </button>
                </view>
              </uni-card>
            </view>
          </label>
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
import {
  getQrCodeReceive,
  getReceive,
  batchClue,
} from "../../../../src/services/getCustomer";
import { ref } from "vue";
const userInfo = ref([]);
const id = ref();
const num = ref(1);
const total = ref();
const receiveflag = {
  receiveflag: 1,
};
const batchsize = ref();
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
      userInfo.value = userInfo.value.concat(res.rows);
    });
  }
}
//批量领取
function handleBatch() {
  batchClue({ ids: batchsize.value });
  
  uni.navigateTo({
    url:'/pages/getCustomer/clue/list'
  })
  // getQrCodeReceive(num.value).then((res) => {
  //   userInfo.value = res.rows;
  //   total.value = res.total;
  // });
}
//获取第一页4条数据
getQrCodeReceive(num.value).then((res: any) => {
  userInfo.value = res.rows;
  total.value = res.total;
});

//点击领取按钮
function handleReceive(e) {
  id.value = e;
  console.log(e, id.value);
  getReceive(id.value, { ...receiveflag, id: id.value, receiveflag: 1 });
  console.log("领取成功");
  num.value = 1
  getQrCodeReceive(num.value).then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
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
}
.scroll_box {
  /* flex: 1; */
  height: calc(100% - 125rpx);
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
}
.btn {
  display: flex;
  margin-top: 20px;
  height: 80rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
  color: #fff;
  width: 100%;
  line-height: 80rpx;
}
</style>
