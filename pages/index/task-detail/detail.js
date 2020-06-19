// pages/index/task-detail/detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    _data:null,
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
  },

  //接单
  takeOrder:function(){
    var _this = this;
    var _data = wx.getStorageSync('_data')
    this.setData({_data:_data})
    wx.request({
      url: 'http://localhost:8080/kbb/takeOrder',
      method:'POST',
      data:{"merchantid":_this.data._data.userId,"id":_this.data.id},
      header:{
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
      },
      success:function(res){
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
     }
    })
  }
})