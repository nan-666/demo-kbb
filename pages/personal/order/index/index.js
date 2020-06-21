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
    service:'',
    index:0,
    smoney:0,
  },
 
  onLoad: function (e) {
    if(app.gobalData.islogin==false){
      wx.showModal({
        title: '提示',
        content: '您还没有登录，确定前往登陆，取消返回主页',
        success (res) {
        if (res.confirm) {
        wx.reLaunch({
          url: '/pages/personal/login/login',
        })
        } else if (res.cancel) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
        }
        }
        })
    }else{
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
        if(_this.data.item==0){
          _this.setData({
            smoney:0,
          })
        }else{
          _this.setData({
            smoney:res.data[0].money,
          })
        }
        console.log(res.data);
        _this.setData({ 
          service:res.data 
        }) 
      } 
    }) 
  }
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
  toDetail:function(e){
    var _this=this;
    var detaildata=_this.data.service[e.currentTarget.dataset.index];
    var datas=JSON.stringify(detaildata)
    console.log(datas)
    wx.navigateTo({
      url: '/pages/personal/order/detail/detail?service='+encodeURIComponent(datas),
    })
  }
})