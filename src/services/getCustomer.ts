import type { AddressParams } from '@/types/address'
import { http } from '@/utils/http'

/**
 * 添加收货地址
 * @param data 请求参数
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

//签到
// /highseas/list
export const getQrCode = ()=>{
  return http({
    method:'GET',
    url:'/highseas/list',
  })
}