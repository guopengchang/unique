<template>
  <view  class="my_page" :style="{ paddingTop:` ${top}+ rpx` }">
    <!-- logo文字 -->
    <view>
    <text class="profile_box">个人信息</text> </view>
    <view>
      <text class="nickname">昵称：{{ nickname||'未登录' }}</text>
    </view>
      <!-- 操作按钮 -->
    <view class="action" v-if="memberStore.profile">
      <view @tap="onLogout" class="button">退出登录</view>
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
        uni.navigateBack()
      }
    },
  })
}
const nickname=ref('');
// 获取屏幕边界到安全区域距离
const { safeAreaInsets  } = uni.getSystemInfoSync() ;
const top = safeAreaInsets?.top ||0;
// 调用音频
onShow(()=>{
 let profile:any= useMemberStore().profile||{}
 nickname.value=profile.nickname
})
</script>

<style lang="scss" scoped>
.my_page{
  padding: 0 30rpx;
}
view{
  text-align: center;
}
.profile_box{
  font-size: 22px;
  text-align: center;
}
.nickname{
  font-size: 26px;
}
/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 140rpx;
  font-size: 32rpx;
  color: #333;
  .button {
    background-color: rgb(192, 204, 255);
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}
</style>