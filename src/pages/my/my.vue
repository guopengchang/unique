<template>
  <view  class="my_page" :style="{ marginTop:` ${top+30}px` }">
    <view class="info_box">个人信息</view>
    <!-- logo文字 -->
    <view class="name_box" v-if="memberStore.profile">
      <text class="nick">昵称：</text>
      <text class="name">{{ nickname }}</text>
    </view>
    <view  style="text-align: center" v-else>
      <text class="nickname">您尚未登录</text>
    </view>
      <!-- 操作按钮 -->
    <view class="action" v-if="memberStore.profile">
      <view @tap="onLogout" class="button">退出登录</view>
    </view>
    <view class="action" v-else>
     <navigator
      class="button"
      url="/pages/login/login"
      open-type="navigate"
      hover-class="none"
     >
      前往登录
     </navigator>
   
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app';
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()

// 退出登录
const onLogout = () => {
  // 模态弹窗
  uni.showModal({
    content: '是否退出登录？',
    success: (res) => {
      if (res.confirm) {
        // 清理用户信息
        memberStore.clearProfile()
        // 返回上一页
        // uni.navigateBack()
        // uni.switchTab({ url: '/pages/index/index' })
      }
    },
  })
}
const nickname=ref();
// 获取屏幕边界到安全区域距离
const { safeAreaInsets  } = uni.getSystemInfoSync() ;
const top = safeAreaInsets?.top ||0;
// 调用音频
onShow(()=>{
 let profile:any= useMemberStore().profile||{}
 nickname.value=profile.nickname
 console.log(nickname.value)
})
</script>

<style lang="scss" scoped>
.info_box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58rpx;
  line-height: 58rpx;
  width: 100%;
  margin-bottom: 100rpx;
  background-color: #fff;
  font-size: 32rpx;
}
/* 操作按钮 */
.action {
  position: fixed;
  bottom: 250rpx;
  left: 50%;
  transform: translateX(-300rpx);
  .button {
    background-color:#158AF7;
    border-radius: 12rpx;
    width: 600rpx;
    height: 82rpx;
    line-height: 82rpx;
    text-align: center;
    font-size: 40rpx;
    color: white;
  }
}

.name_box{
  padding: 0 36rpx;
  height: 80rpx;
  box-shadow: inset ;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-top: 62rpx;
  .nick{
    color: #3D3D3D;
    font-size: 36rpx;
  }
  .name{
    font-size: 32rpx;
    color: #9F9F9F;
  }
}
</style>