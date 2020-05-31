// pages/index/search/result/result.js
Page({
  data:{
    type:'',
    list:'',
    show:true
  },

  //数据加载
  onLoad: function (options) {
    var _this = this;
    var type = options.data;
    this.setData({
        type:type,
    })
    //向后台请求数据
    wx.request({
      url: 'http://localhost:8080/kbb/merchant/search',
      method:'POST',
      data:{"type":_this.data.type},
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // 设商家列表数据
        _this.setData({
          list:res.data
        })
      }
    })
  },

  resultShow:function(e){
    var type = e.detail.value;
    var _this = this;
    this.setData({
      type:type,
  })
  //向后台请求数据
  wx.request({
    url: 'http://localhost:8080/kbb/merchant/search',
    method:'POST',
    data:{"type":_this.data.type},
    header:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    success:function(res){
      // 设商家列表数据
      _this.setData({
        list:res.data
      })
    }
  })
  }

})