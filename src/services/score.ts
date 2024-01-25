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