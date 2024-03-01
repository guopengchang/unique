<template>
  <view class="screen">
    <search :filters="filters" tips="请输入学校或年级" @input="handleFilter"></search>
    <scroll-view scroll-y class="client" @scrolltolower="ReachBottom">
      <checkbox-group @change="assigningJob">
      <view v-for="users in userInfo" :key="users.id">
        <uni-card class="card_user" :is-shadow="true" shadow="5px 5px 5px 5px rgba(1, 1, 1, 0.08)">
            <label>
              <view style="margin: auto 0; margin-left: 20rpx">
                <checkbox color="blue" :value="users.id" />
              </view>
             </label>
          <view style="color: #3d3d3d">
            <text
              >客户名称<text>:&nbsp;&nbsp;{{ users.cuname }}</text>
            </text>
          </view>
          <view class="content" >
            <text
              >所选课程<text>:&nbsp;&nbsp;{{ users.cuprod }}</text>
            </text>
          </view>
          <view class="content">
            <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
              >年级
            </text>
            <text>:&nbsp;&nbsp;{{ users.cugrade }}</text>
          </view>
          <view class="content">
            <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
              >学校
            </text>
            <text>:&nbsp;&nbsp;{{ users.cuschool }}</text>
          </view>
          <view class="content">
            <text
              >在校专业<text>:&nbsp;&nbsp;{{ users.cumajor }}</text>
            </text>
          </view>
          <view class="content">
            <text style="width: 110rpx; display: inline-block; text-align: justify; text-align-last: justify"
              >录入人
            </text>
            <text>:&nbsp;&nbsp;{{ users.djpeop }}</text>
          </view>
          <view class="btn">
            <button class="btn-item" size="mini" @click="handleDeal">分配用户</button>
          </view>
        </uni-card>
      </view>
    </checkbox-group>
      <div style="height: 20rpx"></div>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { getQrCodeUser } from "@/services/getCustomer";
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
onShow(() => {
  page.value = 1;
  getQrCodeUser(page.value).then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
  });
});

//选中的分配用户的id
let userIdArr = [];
function assigningJob(e) {
  userIdArr=e.detail.value;
}

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
    // if (/^[\d]+$/.test(e)) {
    //   filter.value = `&cutel=${e}`;
    // } else {
    //   filter.value = `&cuname=${e}`;
    // }
    // 年级和学校 都用 学校字段
    filter.value=`&cuschool=${e}`
  }
  page.value = 1;
  getQrCodeUser(page.value, filter.value).then((res: any) => {
    userInfo.value = res.rows;
    total.value = res.total;
  });
}
// 点击跳转
function handleDeal() {
  if(!userIdArr.length){
    uni.showToast({
      title: "请选择用户",
     icon: "fail",
    })
  }
  uni.navigateTo({
    url: `/pages/getCustomer/user/item?id=${userIdArr}`,
  });
}
</script>
<style lang="scss" scoped>
.screen {
  height: 100vh;
  background-color: #f4f4f4;
}

.card_user{
  position: relative;
}
// class="uni-label-pointer"
:deep(.uni-label-pointer){
  position: absolute;
  top:1rem;
  right: 1rem;
}
.client {
  height: calc(100vh - 100rpx);
}
.btn {
  display: flex;
  margin-top: 20rpx;
}
.btn-item {
  background-image: linear-gradient(135deg, #158AF7, #158AF7 70%, #158AF7);
  color: #fff;
  width: 80%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
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
.content {
  color: #9f9f9f;
  font-size: 28rpx;
}
</style>
