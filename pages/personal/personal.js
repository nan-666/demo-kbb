// pages/personal/personal.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    userInfo: {},         // 用户信息
    hasUserInfo: false,  // 是否获取用户信息成功
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: '/image/forum.png',
      },
      {
        typeId: 1,
        name: '待服务',
        url: 'bill',
        imageurl: '/image/forum.png',
      },
      {
        typeId: 2,
        name: '待评价',
        url: 'bill',
        imageurl: '/image/forum.png'
      },
      {
        typeId: 3,
        name: '售后',
        url: 'bill',
        imageurl: '/image/forum.png'
      }
    ],
  },

  onLoad: function(){
    this.setData({
      userInfo:app.gobalData.userInfo,
    })
  },
  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/personal/worker/worker' })
  },
  navclick:function(e){
    var typeid=e.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: '/pages/personal/order/index/index?typeid='+typeid,
    })
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