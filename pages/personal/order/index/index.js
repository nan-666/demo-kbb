//index.js
Page({
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
  
  //点击跳转至订单详情页页面
  toDetail:function(){
    wx.navigateTo({
      url: '/pages/personal/order/detail/detail',
    })
  }
})