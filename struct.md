```shell
query传参
uni.navigateTo({ url:
 `/pagesOrder/create/create?skuId=${ev._id}&count=${ev.buy_num`
 })

获取query传参
const query = defineProps<{
  skuId?: string
  count?: string
  orderId?: string
}>()



```

# 传参

```shell

// 暴露方法给 父组件
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})


 父组件用ref获取子组件dom拿到暴露的属性
 <children ref="child">
 child.value.resetData
 child.value.getMore
```

# 生命周期

```shell
可以展开 uni-app 生命周期，分为三部分：

应用生命周期：与 小程序 应用的生命周期一致（onLaunch、onShow、onHide 等）
页面生命周期：与 小程序 页面的生命周期一致（onLoad、onUnload、onShow 等）
组件生命周期：与 Vue.js 组件的生命周期一致（mounted、created 等）
```
