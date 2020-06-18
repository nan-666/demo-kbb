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

  // 打开小程序最先执行此函数，实际开发中常用来做登录判断、存储/更新缓存等
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


    
    // 验证登录：取出缓存中token
    var token = wx.getStorageSync('token');
    if (token) { // 已有token
      _this.checkLogin(token)
    } else {
      this.login();
    }

    // 判断用户已授权项，根据授权项来依次获取用户信息等
    wx.getSetting({
      success: (res) => {
        console.log('wx.getSetting')
        // authSetting：保存用户的授权结果的数组， 返回值为true或false
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              this.gobalData.userInfo = res.userInfo;
              if(this.getUserInfoCallback){
                this.getUserInfoCallback(res)
              }
            }
          })
        }
      },
    })

  },

  // 校验token有效性
  checkLogin: function (token) {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:8080/kbb/main/java/action/login/CheckLogin',
      method: 'POST',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        var msg=res.data.msg;
        _this.gobalData.userId=msg.replace(/[^0-9]/ig,"");
        if(res.data.success){        // token有效，存为全局变量
          _this.gobalData.token = token;
          // 全局变量赋值后，执行回调函数，完成index中的操作
          // 如果getCreditCallback不为空，说明在index中定义了getCreditCallback函数，此时将回调执行此函数
          if(_this.getCreditCallback){
            _this.getCreditCallback();
          }
        }else{                  // token无效，重新调用登录获取token
          _this.login();
        }
      }
    })
  },

  login: function () {
    var _this = this;
    // 用户登录
    wx.login({
      success: (res) => {
        console.log("res.code:"+res.code);
        // 发送code到开发者服务器，获取openId等信息，生成token凭证
        wx.request({
          url: 'http://localhost:8080/kbb/main/java/action/login/Login',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            // 将token保存为全局变量，共各页面使用
            _this.gobalData.token = res.data.data.token;
            _this.gobalData._data = res.data.data;
            _this.gobalData.userId=res.data.data.userId;
            // 将token存入缓存，下次打开小程序无需再登录获取token
            wx.setStorage({
              data: res.data.data,
              key: '_data'
            }
            );
            wx.setStorage({
              data: res.data.data.token,
              key: 'token'
            }
            )
          }
        })
      },
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
  // 全局变量定义
  gobalData: {
    token: '',
    userInfo: null,
    userId:'',
    balance:0
  }
})