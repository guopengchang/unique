import type { AddressParams } from "@/types/address";
import { http } from "@/utils/http";

/**
 * 添加收货地址
 * @param data 请求参数
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: "POST",
    url: "system/member/address",
    data,
  });
};

//签到
// /highseas/list
export const getQrCode = () => {
  return http({
    method: "GET",
    url: "system/highseas/list",
  });
};

export const getSource = () => {
  return http({
    method: "GET",
    url: "system/dict/data/type/sys_data_sour",
  });
};

export const getProd = () => {
  return http({
    method: "GET",
    url: "system/dict/data/type/sys_purp_prod",
  });
};

export const getClientList = () => {
  return http({
    method: "GET",
    url: "system/highseas/list?cuflag=2",
  });
};

export const getClient = (id: number) => {
  return http({
    method: "GET",
    url: "system/highseas/" + id,
  });
};

//获取单个学员信息
export const getQrCodeOne = (id: any) => {
  return http({
    method: "GET",
    url: "system/highseas/" + id,
  });
};
//修改单个学员信息
export const gets = (id: any, data: any) => {
  return http({
    method: "PUT",
    data: data,
    url: "system/highseas",
  });
};

//获取负责人信息
// /system/highseas/getxs
export const getlist = () => {
  return http({
    method: "POST",
    // url: "http://192.170.0.198:8987/system/highseas/getxs",
    url: "system/highseas/getxs",
  });
};
//跟进内容
// /system/follow/list
export const followlist = () => {
  return http({
    method: "GET",
    url: "system/follow/list",
  });
};
