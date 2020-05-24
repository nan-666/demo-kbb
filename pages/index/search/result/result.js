// pages/index/search/result/result.js
Page({
  data:{
    type:'',
    list:''
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
      url: 'http://127.0.0.1:3001/getList/',
      method:'POST',
      data:type,
      success:function(res){
        // 设商家列表数据
        
        for(var i = 0; i < res.data.length;i++){
          _this.setData({
            list: res.data[i].Info
          })
        }
      }
    })
  }

})