import { ref } from "vue";
export const range = [
  { value: "男", text: "男" },
  { value: "女", text: "女" },
];

export function resultlize(res: any) {
  return {
    //录入人姓名
    djpeop:res.data.djpeop,
    //客户姓名
    cuname: res.data.cuname,
    cusex: res.data.cusex,
    cuidcard: res.data.cuidcard,
    cutel: res.data.cutel,
    wechatid: res.data.wechatid,
    cuemail: res.data.cuemail,
    cuaddr: res.data.cuaddr,
    curecord: res.data.curecord,
    cusource: res.data.cusource,
    cuprod: res.data.cuprod,
    cuschool: res.data.cuschool,
    cugrade: res.data.cugrade,
    cumajor: res.data.cumajor,
    famstate: res.data.famstate,
    perintr: res.data.perintr,
    cuhobby: res.data.cuhobby,
    cudoubt: res.data.cudoubt,
    cunstat: res.data.cunstat,
    highscont: res.data.highscont,
  };
}
