// 拦截uploadFile文件上传
// todo:
// 1.非http开头需要拼接地址
// 2.请求超时
// 3.小程序的请求头标识

import { useMemberStore } from '@/stores'

// 4.添加tok!
const baseURL = 'http://stu.ueksx.com/finance-api/'
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //请求超时时间
    options.timeout = 5000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = 'Bearer ' + token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
interface Data<T> {
  msg: string
}
export const http = <T>(options: UniApp.RequestOptions): any => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.redirectTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '失败',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'fail',
          title: '网络错误',
          duration:3000
        })
        reject(err)
      },
    })
  })
}
