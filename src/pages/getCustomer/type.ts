export interface client {
  cuname?: string; //姓名
  cusex?: number; //性别
  cuidcard?: number; //身份证号
  cutel?: number; //电话
  wechatid?: number; //微信
  cuemail?: string; //邮箱
  cuaddr?: string; //地址
  curecord?: string; //学历
  cusource?: string; //数据来源
  cuprod?: string; //意向产品
  cuschool?: string; //学校
  cugrade?: string; //年级
  cumajor?: string; //专业
  famstate?: any; //家庭情况
  perintr?: any; //个人介绍
  cuhobby?: any; //兴趣爱好
  cudoubt?: any; //疑难点
  cunstat?: any; //目前状态
  highscont?: string; //备注
}

export interface payment {
  cuname?:string; //用户名
  highsid?: number; //客户id
  planmoney?: string; //回款金额
  termmoney?: string; //回款期数
  moneydate?: string; //回款日期
  waymoney?: string; //汇款方式
}
