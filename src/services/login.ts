// src/services/login.ts

import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 账号密码登录
 *
 */
export const postLoginAPI = (loginData) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login',
    data: loginData,
  })
}
