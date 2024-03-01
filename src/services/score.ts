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
  });};


//获取测评列表
export const getEvalList = () => {
  return http({
    method: "GET",
    url: "/system/eval/list?pageSize=40",
  });
};

//得分
export const getScore = (rid: any) => {
  return http({
    method: "POST",
    url: "/system/evaldetails/avgscop?rid=" + rid,
  });
};

//保存测评结果
export const saveScore = (data: any) => {
  return http({
    method: "PUT",
    data,
    url: "/system/eval",
  });
};

//获取测评详情
export const getEvaluationDetail=(rid:string)=>{
  return http({
    method: "GET",
    url: "system/evaldetails/list?rid=" + rid
  })
}