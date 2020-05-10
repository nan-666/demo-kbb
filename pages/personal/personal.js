// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/personal/worker/worker' })
  }
})