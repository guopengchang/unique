<template>
  <form @submit="submit">
    <view class="list">
      <view class="name" style="margin-left: 10px">关联类型</view>
      <view style="margin-bottom: 30rpx; margin-left: 10px"><uni-data-checkbox  :localdata="sex" /></view>
    </view>
    <view class="border" style="display: flex">
      <view class="label">跟进客户</view>
      <view class="name" style="margin-left: 190rpx">
        <uni-data-picker style="width: 380rpx" placeholder="请选择客户" :localdata="items"> </uni-data-picker>
      </view>
    </view>
    <view class="border" style="display: flex">
      <view class="label">跟进方式</view>
      <view class="name" style="margin-left: 190rpx">
        <uni-data-picker style="width: 380rpx" placeholder="请选择跟进方式" :localdata="items"> </uni-data-picker>
      </view>
    </view>
    <view>
      <view class="label"> 跟进内容</view>
      <uni-easyinput type="textarea" autoHeight placeholder="请输入跟进内容"></uni-easyinput>
    </view>

    <view class="border" style="display: flex; justify-content: space-around">
      <view class="label">下次跟进时间</view>
      <view style="width: 180px"> <uni-datetime-picker class="label" type="date" :clear-icon="false" /></view>
    </view>

    <view class="border">
      <view class="label">提醒谁看</view>
      <view class="round"></view>
    </view>
    <view class="op">
      <button class="confirm" form-type="submit">确认</button>
    </view>
  </form>
<navigator
  :url="`/pages/getCustomer/follow-up/${a}`"
  open-type="navigate"
  hover-class="navigator-hover"
>
  111
</navigator>
</template>
<script setup>
import { ref } from "vue";
const a=ref("list")
// 关联类型数据
const sex = ref([
  {
    text: "客户",
    value: 0,
  },
  {
    text: "商机",
    value: 1,
  },
  {
    text: "合同",
    value: 2,
  },
  {
    text: "线索",
    value: 3,
  },
]);
// 跟进方式数据
const items = ref([
  {
    text: "电话",
    value: "1-0",
  },
  {
    text: "线下见面",
    value: "2-0",
  },
  {
    text: "视频",
    value: "3-0",
  },
  {
    text: "微信",
    value: "3-0",
  },
]);
//获取表单数据
function submit(e){
  console.log(e)
  // uni.navigateBack()
}

</script>
<style>
.list {
  border-bottom: 1px solid #e3d8d8;
}
.name {
  margin-top: 30rpx;
  margin-bottom: 30rpx;
}
.border {
  border-bottom: 1px solid #e3d8d8;
}
.label {
  margin-top: 40rpx;
  margin-bottom: 30rpx;
  margin-left: 20rpx;
}
.uni-forms-item[data-v-3515f8e1] {
  display: block;
}
.uni-forms-item__label {
  width: 160rpx !important;
}
.round {
  margin-left: 10px;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid red;
}
.op {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  background: #fff;
  

  .confirm {
    background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
    color: #fff;
    width: 22.1875rem;
    height: 2.5rem;
    border-radius: 1.25rem;
  }
  .remove {
    border: 1px solid #ccc;
    box-shadow: 0 6rpx 12rpx 0 rgb(0 0 0 / 5%);
    color: #333;
  }
}
</style>
