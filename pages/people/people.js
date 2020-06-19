// pages/people/people.js
Page({
  data:{
    list:''
  },
  onLoad:function(){
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/kbb/MerchantGet',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        _this.setData({
          list:res.data
        })
      }
    })
  }

})