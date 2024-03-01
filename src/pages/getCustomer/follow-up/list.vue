<template>
  <view style="background-color: #f9f9f9; height: 100vh">
    <scroll-view :scroll-y="true">
      <view v-for="users in userInfo">
        <uni-card :is-shadow="true" shadow="5px 5px 5px 5px rgba(1, 1, 1, 0.08)">
          <view class="card-box">
            <view style="margin-bottom: 20rpx">
              <text style="font-size: 36rpx; font-weight: bold;color: #3D3D3D;;">{{ users.cuname }}</text>
              <text style="margin-left: 20rpx; font-size: 20rpx; color: #B0B0B4">{{ users.cuschool }}</text></view
            >
            <view class="btn-edit" @click="() =>flowContent(users.id)">跟进内容</view>
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
              @click="() =>{}"
            >
            </view>
          </view>
        </uni-card>
      </view>
    </scroll-view>
    <DrawerComponent :followHistory="followHistory" ref="drawerCom"/>
  </view>
</template>
<script setup lang="ts">
import DrawerComponent from './component/DrawerComponent.vue'
import {  getQrCode,getFlowContent } from "@/services/getCustomer";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

let drawerCom = ref()

const userInfo: any = ref([]);

//跟进内容历史
const followHistory= ref()


onLoad(() => {
  getQrCode().then((res: any) => {
    console.log(res);
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
    }
    if (res.code === 200) {
      if (res.data.length !== 0) {
        userInfo.value = res.data;
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

let flowContent=(id:string)=>{
  getFlowContent(id).then(res=>{
    if (res.code !== 200) {
      uni.showToast({ icon: "none", title: res.msg });
      return;
    }
      if (res.rows.length !== 0) {
        followHistory.value= res.rows;
        console.log(followHistory.value,res.rows)
        drawerCom.value.showDrawer()
      } else {
        uni.showToast({
          icon: "error",
          title: "数据列表为空或没有权限",
          duration: 3000,
        });
      }
  }).catch(err=>{
    console.log(err,'94')
  })
}

</script>
<style lang="scss" scoped>
.mini-box {
  background-color: #158af7;
  height: 80rpx;
  width: 25rpx;
  position: absolute;
  top: 20%;
  left: 0rpx;
}

.card-box {
  border-bottom: .5px solid #d8d8d8;
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
