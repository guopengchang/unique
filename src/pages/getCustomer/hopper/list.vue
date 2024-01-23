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
      <view>
        <uni-card v-for="users in userInfo" :is-shadow="false">
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
            <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
              >年级
            </text>
            <text>:{{ users.cugrade }}</text>
          </view>
          <view>
            <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
              >学校
            </text>
            <text>:{{ users.cuschool }}</text>
          </view>

          <view>
            <text
              >在校专业<text>:{{ users.cumajor }}</text>
            </text>
          </view>
          <view class="btn footer">
            <view class="btn-item" @click="() => editClient(users.id)">编辑 </view>
            <view class="btn-item" @click="() => setClientID(popupMore, users)"> 更多 </view>
          </view>
        </uni-card>
      </view>
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
import { getHopper, getChange, getHopperSearch, addPhoneRecord } from "../../../../src/services/getCustomer";
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
async function handleClient(pop: any, id: any) {
  await getChange({ cuflag: 2, id: id });
  getHopper().then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
  }).then(()=>{
    uni.showToast({
      icon:'success',
      title:'转客户成功'
    })
  });
  closePop(pop);
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

function editClient(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/editClient?id=${id}`,
  });
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
</style>
