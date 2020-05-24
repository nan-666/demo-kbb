//app.js
// 引入腾讯IM SDK
import TIM from '/utils/tim-wx';
// 发送图片、文件等消息需要的 COS SDK。如果聊天发送的是纯文字，这里不必要导入
import COS from "/utils/cos-wx-sdk-v5";

let options = {
  SDKAppID: 1400374895   // 接入时需要换为您的即时通信应用的 SDKAppID
};

// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例。SDK 实例通常用 tim 表示
let tim = TIM.create(options); 

// 注册 COS SDK 插件。如果聊天发送的是纯文字，这里不需要注册
tim.registerPlugin({'cos-wx-sdk': COS});

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //tim
    var _this = this;
    let onSdkReady = function (event) {
      _this.gobalData.isSdkReady = true
    };
    tim.on(TIM.EVENT.SDK_READY, onSdkReady);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
  ,
  tim: tim,
  event: {
    SdkReady: TIM.EVENT.SDK_READY
  },
  gobalData: {
    userId: '',
    isSdkReady: false
  }
})