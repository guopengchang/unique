<script setup lang="ts">
import { ref, reactive } from 'vue'
import {  postLoginAPI } from '@/services/login'
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import logo from '@/static/logo.png'

const form = ref<any>()

let formData = reactive({
  username: '',
  password: '',
})

let rules = {
  username: {
    rules:[
      {
        required: true,
        errorMessage: '请输账号',
        minLength: 2,
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '请输入密码',
      },
    ],
  },
}

//======登录表单逻辑===

// code 获取不要在 getphonenumber 事件回调函数调用，否则可能会出现错误！！！

// 用户登录态，不包含用户昵称、性别、手机号码等信息，作用是用于后端与微信服务器通讯。
// 获取 code 登录凭证
// 获取 code 登录凭证
// let code = ''
// onLoad(async () => {
//   const res = await wx.login()
//   code = res.code
// })

// 获取用户手机号码

// const onGetphonenumber = async (ev) => {
//   //获取手机号功能针对非个人开发者，且完成认证的小程序开发
//   //使用企业小程序appid,且吧微信号添加到开发者列表中
//   // 获取参数
//   const encryptedData = ev.detail.encryptedData!
//   const iv = ev.detail.iv!
//   // 登录请求 登录凭证 + 手机号 实现授权登录。
//   await postLoginWxMinAPI({ code, encryptedData, iv })
//   // 成功提示
//   uni.showToast({ icon: 'none', title: '登录成功' })
// }

//submit校验
const submitForm = () => {
  form.value
    .validate()
    .then((res) => {
      loginSubmit()
    })
    .catch((err) => {
      formData.username = ''
      formData.password = ''
    })
}
const isLoading=ref(false);
// 账号密码登录
const loginSubmit = async () => {
  isLoading.value=true;
  uni.showLoading({
    title: '加载中'
  });

  try {
    const res = await postLoginAPI(formData)
    uni.hideLoading();
    isLoading.value=false;
   if (res.code !== 200) {
      uni.showToast({ icon: 'fail', title: res.msg,duration:2000 })
      return
    }
    if (res.code === 200) {
      loginSuccess({ token: res.token,nickname:res.nickname })
      formData.username = ''
      formData.password = ''
    }
  } catch (error) {
    uni.hideLoading();
    isLoading.value=false;
  }

}

const loginSuccess = (profile: any) => {
  // 保存用户信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  // 成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // uni.switchTab跳转的必须是TabBar上的路径；
    // uni.navigateTo跳转非TabBar上的路径
    uni.navigateBack()
    // uni.switchTab({ url: '/pages/index/index' })
  }, 200)
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image :src="logo"></image>
    </view>
    <view class="login">
      <!-- 表单登录 -->
      <!-- formData、rules 内容详见下方完整示例 -->
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item label="账号" name="username" required>
          <uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password" required>
          <uni-easyinput type="text" v-model="formData.password" placeholder="请输入密码" />
        </uni-forms-item>
        <button @click="submitForm" class="button" type="primary" :disabled="isLoading">Submit</button>
      </uni-forms>

      <!-- 小程序端授权登录 -->

      <view class="extra">
        <view class="caption">
          <text>其他方式登录</text>
        </view>
        <!-- <view class="options">
          <button
            class="button phone"
            open-type="getPhoneNumber"
            @getphonenumber="onGetphonenumber"
          >
            <text class="icon icon-phone"> 手机号快捷登录</text>
          </button>
        </view> -->
      </view>
      <!-- <view class="tips_box">
        <label class="tips"><radio value="r1"  />
          登录/注册即视为你同意《服务条款》和《隐私协议》
        </label>
			</view> -->
     
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  // flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 5vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}

:deep(.uni-radio-input){
  width: 16px;
  height: 16px;
} 
</style>
