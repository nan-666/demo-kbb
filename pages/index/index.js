//index.js

Page({
  data:{
    item: 0,
    tab: 0,
    items:0,
    tabs:0
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
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tab: e.detail.current
    })
  },
  // 任务大厅标签栏点击监听
  changeItems(e) {
    var items = e.currentTarget.dataset.item;
    this.setData({
      items: items
    })
  },
  // 任务大厅滑块滑动时的监听函数
  changeTabs: function (e) {
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tabs: e.detail.current
    })
  }
  ,
  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/map/map' })
  },

  // 点击跳转至家电维修页面
  toService: function(e) {
    wx.navigateTo({
      url: '/pages/index/portal/service/service',
    })
  }
  ,
//点击话题内容跳转到帖子详情页
toDetails:function(){
  wx.navigateTo({
    url: '/pages/index/task-detail/detail',
  })
}
})
