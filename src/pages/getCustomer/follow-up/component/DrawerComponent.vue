<template>
       <uni-drawer ref="drawerComponent" mode="left" :width="320" >
					<view >
						<button class="close_btn" @click="closeDrawer"><text>关闭Drawer</text></button>
					</view>
          <scroll-view scroll-y class="follow_content">
            <view class="followBox" v-for="item in followHistory" :key="item.id">
              <p>跟进人:&nbsp;&nbsp;{{ item.cuowner }}</p>
              <p>跟进类容:&nbsp;&nbsp;{{ item.followcont }}</p>
              <p>跟进类型:&nbsp;&nbsp; {{ item.followtype }}</p>
              <p>下次跟进时间:&nbsp;&nbsp;{{ item.nextdate }}</p>
            </view>
          </scroll-view>
   
				</uni-drawer>
</template>
<script setup lang="ts">
import {ref} from 'vue'
let a= defineProps(['followHistory'])
let drawerComponent = ref();

let showDrawer =()=> {
    drawerComponent.value.open();
}
let closeDrawer=()=> {
      drawerComponent.value.close();
}
// 使用defineExpose将组件中的数据交给外部
defineExpose({showDrawer,closeDrawer})
</script>
<style lang="scss" scoped>
.follow_content{
  height: 90%;
  padding-bottom: 10rpx;
}
.followBox{
  border:1px solid black;
  margin:20rpx;
  padding:15rpx;
  p{
    margin-top: 15rpx;
    margin-bottom: 15rpx;
  }
}
.close_btn{
  height: 80rpx;
  line-height: 80rpx;
  background-color: skyblue;
}
</style>