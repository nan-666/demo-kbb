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
  toChat:function(e){
    console.log(e.target.dataset.userid)
    wx.navigateTo({
      url: '/pages/chat/chat/chat?toAccount=' + e.target.dataset.userid    // 将聊天对方ID传递到会话页面
    })
  }
})