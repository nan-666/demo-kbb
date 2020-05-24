// pages/personal/C_Services/C_Services.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: [
      // {
      //   id: 1,
      //   name: "修空调",
      //   image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air1.png"
      // },
      // {
      //   id: 2,
      //   name: "空调移机",
      //   image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air2.png"
      // },
      // {
      //   id: 3,
      //   name: "空调加氧",
      //   image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air3.png"
      // },
      // {
      //   id: 4,
      //   name: "修冰箱",
      //   image: "http://q9xwl365p.bkt.clouddn.com/service/icon/refrigerator.png"
      // }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:3000/getC_Services/',
      //method:'GET'            //GET请求方式为默认，可以不写
      success:function(res){
        _this.setData({list:res.data})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})