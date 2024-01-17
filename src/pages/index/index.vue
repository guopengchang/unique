<template>
  <view class="content">
    <uni-card title="获客管理" class="card">
      <navigator
        class="navigator-item"
        v-for="(item, index) in getCustomerList"
        :key="index + item.name"
        :url="`${item.path}`"
      >
        <image class="image" mode="aspectFill" :src="item.icon"></image>
        <view class="name"> {{ item.name }} </view>
      </navigator>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
onMounted(() => {
  // 导航到指定页面 // pageName为要跳转的页面名称
  // uni.navigateTo({
  //     url: '/pages/login/login'
  // });
})
const title = ref('Hello')
// 猜你喜欢的列表
const getCustomerList = ref<any[]>([
  {
    path: '/pages/getCustomer/signIn',
    icon: '',
    name: '签到',
  },
  {
    path: '/pages/getCustomer/clue',
    icon: '',
    name: '线索',
  },
  {
    path: '/pages/getCustomer/clue',
    icon: '',
    name: '公海客户',
  },
  {
    path: '/pages/getCustomer/clue',
    icon: '',
    name: '跟进',
  },
])
</script>

<style lang="scss">
.content {
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
  .navigator-item {
    width: 25%;
    height: 200rpx;
    display: inline-block;
    .image {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
