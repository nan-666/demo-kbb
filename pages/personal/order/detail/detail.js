// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function () {
    var _this=this; 
    wx.request({ 
      url: 'http://localhost:8080/kbb//main/java/action/order', 
      method:'POST', 
      data: {
        item: _this.data.item,
        userId:app.gobalData.userId
      },
      header:{ 
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }, 
      success:function(res){ 
        console.log(res.data);
        _this.setData({ 
          service:res.data
        }) 
      } 
    }) 
  }
})