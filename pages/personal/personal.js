// pages/personal/personal.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    userInfo: {},         // 用户信息
    hasUserInfo: false  // 是否获取用户信息成功
  },

  onLoad: function(){
    if(app.gobalData.userInfo){   // 如果全局变量中有用户信息
      this.setData({
        userInfo: app.gobalData.userInfo,
        hasUserInfo: true
      })
    }else{    // 否则通过回调函数，从app.js中获取用户信息
      app.getUserInfoCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  // 单击按钮获取用户信息，仅第一次需要用户授权时才须点击，授权成功后下次再获取用户信息，
  // 只需在app.js中调用wx.getUserInfo获取
  getUserInfo: function(e){
    console.log(e)
    if(e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },

  // 单击按钮获取用户信息，仅第一次需要用户授权时才须点击，授权成功后下次再获取用户信息，
  // 只需在app.js中调用wx.getUserInfo获取
  getUserInfo: function(e){
    console.log(e)
    if(e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/personal/worker/worker' })
  },


  //点击账号设置跳转到设置页
  toSetting:function(){
    wx.navigateTo({
      url: '/pages/Asetting/setting',
    })
  },
  //点击账户余额跳转到余额
  toBalance:function(){
    wx.navigateTo({
      url: '/pages/personal/property/balance/balance',
    })
  },
  // 点击常用服务跳转到常用服务页
  toC_Services: function() {
    wx.navigateTo({
      url: '/pages/personal/C_Services/C_Services',
    })
  },
  //点击服务号跳转到售后页
  toAftersale:function(){
    wx.navigateTo({
      url: '/pages/personal/property/aftersale/aftersale',
    })

  }
  ,
  order:function(){
    wx.navigateTo({
      url: '/pages/personal/order/index/index',
    })

  }
})