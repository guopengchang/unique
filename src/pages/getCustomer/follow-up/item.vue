<template>
  <form @submit="submit">
    <view class="line" style="display: flex; justify-content: space-between">
      <view class="labeluser">跟进客户</view>
      <input
        style="text-align: end; margin-top: 40rpx; margin-right: 30rpx"
        :disabled="true"
        v-model="tableForm.cuname" />
    </view>
    <view class="border" style="display: flex; justify-content: space-between">
      <view class="label">跟进方式</view>
      <view class="name" style="margin-right: 20rpx;width: 300rpx;">
        <uni-data-picker
          :clear-icon="false"
          @change="fashion"
          style="margin-right: 11rpx;"
          placeholder="请选择跟进方式"
          :localdata="items">
        </uni-data-picker>
      </view>
    </view>
    <view style="border-bottom: 1rpx solid #e3d8d8;">
      <view class="label"> 跟进内容</view>
     <view  style="width:90%;margin-left: 20rpx;margin-bottom: 10rpx;">
      <uni-easyinput
        name="followcont"
        type="textarea"
        autoHeight
        placeholder="请输入跟进内容"></uni-easyinput>
     </view>
    </view>
    <view class="border" style="display: flex; justify-content: space-between">
      <view class="label" style="margin-top: 30rpx;">下次跟进时间</view>
      <view style="width: 300rpx;margin-bottom: 20rpx; margin-right: 20rpx; margin-top: 25rpx">
        <uni-datetime-picker
          @change="time"
          class="label"
         :border="false"
          type="date"
          :clear-icon="false"
      /></view>
    </view>
    <view class="op">
      <button class="confirm" form-type="submit">确认</button>
    </view>
  </form>
</template>
<script setup>
import { ref } from "vue";
import {
  getQrCodeOne,
  addfollowlist,
  followlist,
} from "../../../../src/services/getCustomer";
import { onLoad } from "@dcloudio/uni-app";
const tableForm = ref({});
// 跟进方式
const items = ref([
  {
    text: "打电话",
    value: "1-0",
  },
  {
    text: "发邮件",
    value: "2-0",
  },
  {
    text: "微信",
    value: "3-0",
  },
  {
    text: "发短信",
    value: "4-0",
  },
  {
    text: "见面拜访",
    value: "5-0",
  },
  {
    text: "活动",
    value: "6-0",
  },
  {
    text: "试听课邀约",
    value: "7-0",
  },
  {
    text: "体验营邀约",
    value: "6-0",
  },
]);
//id
const id = ref();
//提交数据
const listForm = ref({
  id: "",
  highsid: "",
  followtype: "",
  followcont: "",
  nextdate: "",
});
//获取客户id和名字
onLoad((e) => {
  //获取id
  id.value = e.id;
  listForm.value.highsid = e.id;
  listForm.value.id = e.id;
  //获取数据
  getQrCodeOne(e.id).then((res) => {
    console.log(res);
    tableForm.value = res.data;
  });
});
followlist().then((res) => {
  console.log(res);
});
//获取跟进方式
function fashion(e) {
  listForm.value.followtype = e.detail.value[0].text;
}
//获取跟进内容
function submit(e) {
  listForm.value.followcont = e.detail.value.followcont;
  console.log(listForm);
  addfollowlist(listForm.value).then(() => {
    uni.showToast({
      title: "新增成功",
      icon: "success",
    });
  });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
}
//获取跟进时间
function time(e) {
  listForm.value.nextdate = e;
}
</script>
<style lang="scss" scoped>
.list {
  border-bottom: 1px solid #e3d8d8;
}
.name {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.border {
  border-bottom: 1rpx solid #e3d8d8;
}
.label {
  margin-top: 30rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
}
.uni-forms-item[data-v-3515f8e1] {
  display: block;
}
.uni-forms-item__label {
  width: 160rpx !important;
}
.round {
  margin-left: 10rpx;
  margin-bottom: 20rpx;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  border: 1rpx solid red;
}
.op {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  background: #fff;
  margin-top: 80rpx;

  .confirm {
    background-image: linear-gradient(135deg, #0c70f2, #0c60f2 70%, #0c32f2);
    color: #fff;
    width: 80%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
  }
  .remove {
    border: 1px solid #ccc;
    box-shadow: 0 6rpx 12rpx 0 rgb(0 0 0 / 5%);
    color: #333;
  }
}
.line {
  background: #fff;
  border-bottom: 1rpx solid #e3d8d8;
  position: relative;

  line-height: 36rpx;

  .label {
    position: absolute;
    top: 30rpx;
    left: 0;
    padding: 0 20rpx;
    width: 130rpx;
  }
  input {
    color: #999;
    line-height: 36rpx;
  }
}
.labeluser {
  padding: 0;
  margin-top: 40rpx;
  margin-bottom: 30rpx;
  margin-left: 20rpx;
}
</style>
