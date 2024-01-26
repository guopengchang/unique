import { http } from "@/utils/http";

/**
 *
 * @param data
 * 添加测评
 */
export const addEval = (data: any) => {
  return http({
    method: "POST",
    url: "/system/eval",
    data,
  });
};

//获取测评列表
export const getEvalList = () => {
  return http({
    method: "GET",
    url: "/system/eval/list",
  });
};

export const getScore = (rid: any) => {
  return http({
    method: "POST",
    url: "/system/evaldetails/avgscop?rid=" + rid,
  });
};

export const saveScore = (data: any) => {
  return http({
    method: "PUT",
    data,
    url: "/system/eval",
  });
};