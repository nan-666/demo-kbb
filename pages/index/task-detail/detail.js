// pages/index/task-detail/detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detailList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    var id = options.id;
    this.setData({
      id:id
    })
    wx.request({
      url: 'http://localhost:8080/kbb/orderDetail',
      method:'POST',
      data:{"id":_this.data.id},
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        _this.setData({
          detailList:res.data
        })
     }
    })
  },
})