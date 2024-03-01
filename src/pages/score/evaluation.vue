<script setup lang="ts">
import { ref } from "vue";
import { getEvalList, getScore, saveScore } from "@/services/score";
import { onLoad } from "@dcloudio/uni-app";
const listData = ref();
const info = ref({});
onLoad(() => {
  getEvalList().then((res: any) => {
    listData.value = res.rows;
  });
});
function InquireScore(rid: any, id: any) {
  console.log('查询了-----------')
  getScore(rid).then(async (res: any) => {
    if (!res.data) {
      return uni.showToast({
        title: "暂无统计信息",
        icon: "none",
      });
    }
    //查完后保存平均分
    info.value = { id: id, evalcalcu: res.data };
    await saveScore(info.value);
    getEvalList()
      .then((res: any) => {
        listData.value = res.rows;
      })
      .then(() => {
        uni.showToast({
          title: "查询成功",
          icon: "success",
        });
      });
  });
}

let evalDetail = (rid)=>{
  uni.navigateTo({ 
    url:`/pages/score/evaluationDetail?rid=${rid}`
 })
}
</script>
<template>
 <scroll-view scroll-y style="background-color: #f4f4f4;height:100vh">
    <view style="height: 1rpx"></view>
    <view v-for="item in listData" :key="item.id">
      <uni-card @tap="evalDetail(item.rid)">
        <view class="name">
          <view class="query"
            >
            <view>测评分数</view>
            <view
              class="find_btn"
              @tap.stop="() => InquireScore(item.rid, item.id)">
              查询
            </view>
          </view>
          <view>{{ item.evalcalcu ? item.evalcalcu + "分" : "" }}</view>
        </view>
        <view class="flex">
          <view>测评班级</view>
          <view>{{ item.evalclass }}</view>
        </view>
        <view class="flex">
          <view>测评阶段</view>
          <view>{{ item.evalstage }}</view>
        </view>
        <view class="flex">
          <view>测评教师</view>
          <view>{{ item.evalteach }}</view>
        </view>
        <view class="flex">
          <view>测评时间</view>
          <view>{{ item.evaldate }}</view>
        </view>
      </uni-card>
    </view>
    <view style="height: 20rpx"></view>
  </scroll-view>
</template>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  margin: 10rpx 0;
  color: #7f7f81;
  font-size: 28rpx;
}
.name {
  border-bottom: 2px solid #d8d8d8;
  margin: 20rpx 0;
  padding-bottom: 20rpx;
  font-weight: bold;
  color: #3d3d3d;
  font-size: 36rpx;
  display: flex;
  justify-content: space-between;
}

.query {
  display: flex;
  align-items: center;
}

.query .find_btn {
  margin-left: 15rpx;
  height: 60rpx;
  width: 100rpx;
  font-size: 20rpx;
  border: 1rpx solid #158af7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #158af7;
  border-radius: 10rpx;
  box-sizing: border-box;
}
</style>
