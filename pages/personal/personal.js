// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  //点击服务号跳转到售后页
  toAftersale:function(){
    wx.navigateTo({
      url: '/pages/personal/property/aftersale/aftersale',
    })

  }
  ,
  order:function(){
    wx.navigateTo({
      url: '/pages/personal/historyorder/historyorder',
    })

  }
})