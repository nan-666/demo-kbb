//index.js
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
    //   coverImgUrl: 'http://q9xwl365p.bkt.clouddn.com/index/task-detail/heart.jpg'
    // }]
  },
 
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:3000',
      success: function (res) {
        _this.setData(res.data)
      }
    })
  },

  // 标签栏点击监听
  changeItem(e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      item: item
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