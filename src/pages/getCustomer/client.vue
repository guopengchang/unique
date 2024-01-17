<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { getClientList } from "../../services/getCustomer";
import { ref } from "vue";
const clientList = ref([]);
onLoad(() => {
  getClientList().then((res: any) => {
    console.log(res.rows);
    clientList.value = res.rows;
  });
});

function editClient(id:any){
    uni.navigateTo({
        url:`/pages/getCustomer/editClient?id=${id}`
    })
}
</script>
<template>
  <div class="client">
    <view>
      <view> 客户 </view>
      <view> 联系人 </view>
      <view>
        <image
          class="statistics"
          src="../../static/数据.png"
          mode="scaleToFill" />
      </view>
      <view v-for="item in clientList">
        <uni-card>
          <view class="title">
            {{ item.id }}
          </view>
          <view>
            {{ item.cuname }}
          </view>
          <view>
            {{ item.cuprod }}
          </view>
          <view class="footer" @click="()=>editClient(item.id)"> 编辑 </view>
        </uni-card>
      </view>
    </view>
  </div>
</template>
<style scoped>
.statistics {
  width: 15px;
  height: 15px;
}
.title {
  border-bottom: 0.5px solid #000;
}
.footer {
  border-top: 0.5px solid #e0e0e0;
}
</style>
