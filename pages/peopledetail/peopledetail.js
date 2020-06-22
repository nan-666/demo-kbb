// pages/peopledetail/peopledetail.js
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
      url: 'http://localhost:8080/kbb/Merchant',
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
  //跳转到预约页面
  toappointment:function(){
    wx.navigateTo({
      url: '/pages/peopledetail/appointment/appointment?id='+this.data.id+'&type='+this.data.detailList[0].type,
    })
  },
  toChat:function(){
    wx.navigateTo({
      url: '/pages/chat/chat/chat?toAccount=' + this.data.id    // 将聊天对方ID传递到会话页面
    })
  },
  

})