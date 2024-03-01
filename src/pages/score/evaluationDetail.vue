<template>
  <scroll-view class="evaluation_box" scroll-y >
     <view style="height: 1rpx"></view>
     <view v-for="item in listData" :key="item.id">
       <uni-card>
         <view>
           <view>测评分:</view>
           <view class="content">
            1、{{ arrMapper[item.col1] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            2、{{ arrMapper[item.col2] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            3、{{ arrMapper[item.col3] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            4、{{ arrMapper[item.col4] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            5、{{ arrMapper[item.col5] }}
           <br>
            6、{{ arrMapper[item.col6] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            7、{{ arrMapper[item.col7] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            8、{{ arrMapper[item.col8] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            9、{{ arrMapper[item.col9] }}
            &nbsp;&nbsp;&nbsp;&nbsp;
            10、{{ arrMapper[item.col10] }}
          </view>
         </view>
         <view>
           <view>给老师建议:</view>
           <view class="content">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.recomm1 }}</view>
         </view>
         <view>
           <view>自身学习情况:</view>
           <view class="content">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.recomm2 }}</view>
         </view>
       </uni-card>
     </view>
     <view style="height: 20rpx"></view>
   </scroll-view>
 </template>
 <script setup lang="ts">
 import {ref} from 'vue';
 import { onLoad } from "@dcloudio/uni-app";
 import {getEvaluationDetail} from '@/services/score'
//  const query = defineProps<{
//   rid:string;
//  }>();
const arrMapper={
  100:'A',
  90:'B',
  80:'C',
  0:'D'
}
let listData = ref([])
onLoad((e)=>{
  getEvaluationDetail(e.rid)
    .then(res=>{
      if(res.code===200){
        listData.value=res.data;
      }else{
        uni.showToast({
          title: "查询失败"+res.msg,
          icon: "fail",
        });
      }
    })
    .catch(err=>{
      uni.showToast({
          title: "查询失败"+err,
          icon: "fail",
        });
    })
})
</script>
 <style lang="scss" scoped>
 uni-page-body{
  height: 100%;
 }
.evaluation_box{
  height: 100%;
  background-color: #f4f4f4;
}
.content{
  color: black;
  font-weight: 700;
}
</style>