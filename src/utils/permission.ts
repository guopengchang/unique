/**
 * @description 自定义路由拦截
 */
import { useMemberStore } from '@/stores'

const whiteList = ['/pages/login/login', '/api/login']

const listNavigate = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack']
export default () => {
  const memberStore = useMemberStore()
  const profileId = memberStore.profile?.token
  listNavigate.forEach((item) => {
    uni.addInterceptor(item, {
      invoke(e) {
        const url = e?.url?.split('?')[0] //获取要跳转的页面路径（url去掉"?"和"?"后的参数）
        if (whiteList.includes(url)) {
          return e
        }
        console.log(profileId, 'permission========', url)
        if (!profileId) {
          uni.redirectTo({ url: '/pages/login/login' })
        }
        return e
      },
    })
  })

  // uni.addInterceptor()
}
