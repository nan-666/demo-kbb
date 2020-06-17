//index.js
var app=getApp()
Page({
  data:{
    // shop:[{
    //   id: 1,
    //   name: '天蓝蓝干洗店'
    // }],
    // service:[{
    //   id: 1,
    //   name: '干洗服务',
    //   detail: '大件',
    //   money: 19.90,
    //   num: 1,
    //   free: 0.00,
    //   trueMoney: 19.90,
    //   coverImgUrl: 'http://qbboxshzh.bkt.clouddn.com/index/task-detail/heart.jpg'
    // }]
    item:0,
  },
 
  onLoad: function (e) {
    this.setData({
      item:e.typeid,
    })
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
  },

  // 标签栏点击监听
  changeItem(e) {
    var item = e.currentTarget.dataset.item;
    var _this=this; 
    wx.request({ 
      url: 'http://localhost:8080/kbb//main/java/action/order', 
      method:'POST', 
      data: {
        item: item,
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
  },
  // 滑块滑动时的监听函数
  changeTab: function (e) {
    console.log(e.detail)
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tab: e.detail.current
    })
  },

  //点击跳转至订单详情页面
  toDetail:function(){
    wx.navigateTo({
      url: '/pages/personal/order/detail/detail',
    })
  }
})