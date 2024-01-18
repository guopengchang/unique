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

//获取数据来源列表
export const getSource = () => {
  return http({
    method: "GET",
    url: "system/dict/data/type/sys_data_sour",
  });
};

//获取意向产品列表
export const getProd = () => {
  return http({
    method: "GET",
    url: "system/dict/data/type/sys_purp_prod",
  });
};

//获取回款方式列表
export const getMoneyWay= () => {
  return http({
    method: "GET",
    url: "system/dict/data/type/sys_pay_way",
  });
};
//增加回款计划
export const addPayplan=(data:any)=>{
  return http({
    method: "POST",
    url: "/system/payplan",
    data
  });
}

//获取客户列表
export const getClientList = () => {
  return http({
    method: "GET",
    url: "system/highseas/list?cuflag=2",
  });
};

//获取单个客户详情
export const getClient = (id: number) => {
  return http({
    method: "GET",
    url: "system/highseas/" + id,
  });
};

//更改单个客户详情
export const updateClient = (data: any) => {
  return http({
    method: "PUT",
    url: "system/highseas",
    data,
  });
};

//移入公海
export const updateClientSea = (data: any) => {
  return http({
    method: "PUT",
    url: "system/highseas",
    data,
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


