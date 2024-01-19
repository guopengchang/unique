<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { getClientList, updateClientSea } from "@/services/getCustomer";
import { ref } from "vue";
import dropMenu from "./dropMenu.vue";
const clientList = ref([]);

onLoad(() => {
  getClientList().then((res: any) => {
    console.log(res)
    clientList.value = res.rows;
  });
});

function editClient(id: any) {
  uni.navigateTo({
    url: `/pages/getCustomer/editClient?id=${id}`,
  });
}
function handleFollow() {
  uni.navigateTo({ url: "/pages/getCustomer/follow-up/item" });
}

function handlePayment(id: any) {
  uni.navigateTo({ url: `/pages/getCustomer/payment?id=${id}` });
}

function handleSea(id: any) {
  updateClientSea({ id, cuflag: "0", cuowner: "", receiveflag: "0" }).then(
    () => {
      getClientList().then((res: any) => {
        clientList.value = res.rows;
      });
    }
  );
}
let graphRefs = ref({});

function showDropdown(e: any, item: any) {
  e.stopPropagation();
  closeDropdown(e, item);
  graphRefs.value[item].showDropdown();
}
function closeDropdown(e: any, filters?: any) {
  e.stopPropagation();
  for (let item in graphRefs.value) {
    if (item != filters) {
      graphRefs.value[item].closeDropdown();
    }
  }
}

const setGraphRef = (el: any, item: string) => {
  if (el) {
    graphRefs.value[item] = el;
  }
};
</script>
<template>
  <div class="client" @click="closeDropdown">
    <view v-for="item in clientList" :key="item">
      <uni-card class="card" :is-shadow="false" :title="item.id">
        <view
          ><text>客户名称:{{ item.cuname }}</text></view
        >
        <view
          ><text>所学课程:{{ item.cuprod }}</text></view
        >
        <view>
          <text>招入老师:{{ item.djpeop }}</text></view
        >
        <view class="btn footer">
          <view class="btn-item" @click="() => editClient(item.id)">编辑 </view>
          <view class="btn-item" @click="(e) => showDropdown(e, item.id)">
            更多
          </view>
        </view>
        <dropMenu
          v-on:handle-follow="handleFollow"
          v-on:handle-sea="() => handleSea(item.id)"
          v-on:handle-payment="() => handlePayment(item.id)"
          :ref="(el) => setGraphRef(el, item.id)">
        </dropMenu>
      </uni-card>
    </view>
  </div>
</template>
<style lang="scss" scoped>
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

.btn {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.btn-item {
  border: 1px solid #007aff;
  border-radius: 3px;
  padding: 0 10px;
  color: #007aff;
}

.list {
  position: absolute;
  padding: 5px 10px;
  border: 1px solid #007aff;
  border-radius: 5px;
  color: #007aff;
  right: 21px;
  margin-top: 5px;
}

.listItem {
  text-align: center;
  padding: 3px 0;
}

:deep(.uni-card) {
  overflow: visible;
}
</style>
