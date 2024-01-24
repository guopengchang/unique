export const rules = {
  cuname: {
    rules: [
      {
        required: true,
        errorMessage: "请输入姓名",
      },
    ],
  },
  cuemail: {
    rules: [
      {
        format: "email",
        errorMessage: "请输入正确的邮箱地址",
      },
    ],
  },
  cutel: {
    rules: [
      {
        required: true,
        errorMessage: "请填写手机号码",
      },
      {
        validateFunction: (_e: any, data: any) => {
          return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            data
          );
        },
        errorMessage: "手机号码格式不正确",
      },
    ],
  },
};
export const paymentRules = {
  planmoney: {
    rules: [
      {
        required: true,
        errorMessage: "请填写回款金额",
      },
    ],
  },
  termmoney: {
    rules: [
      {
        required: true,
        errorMessage: "请填写回款期数",
      },
    ],
  },
  waymoney: {
    rules: [
      {
        required: true,
        errorMessage: "请选择回款方式",
      },
    ],
  },
};

export let signInRules = {
  // 对name字段进行必填验证
  cuschool: {
    rules: [
      {
        required: true,
        errorMessage: '请输入学校',
      },
    ],
  },
  cugrade: {
    rules: [
      {
        required: true,
        errorMessage: '请输入学校',
      },
    ],
  },
  djpeop: {
    rules: [
      {
        required: true,
        errorMessage: '请输入学校',
      },
    ],
  },
}

export let loginRules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输账号",
        minLength: 2,
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码",
      },
    ],
  },
};