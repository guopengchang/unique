<script setup lang="ts">
import permission from '@/utils/permission'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  // permission()
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
