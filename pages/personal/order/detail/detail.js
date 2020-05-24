// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:3000',
      success: function (res) {
        _this.setData(res.data)
      }
    })
  }
})