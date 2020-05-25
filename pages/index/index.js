//index.js

Page({
  data:{
    item: 0,
    tab: 0,
    items:0,
    tabs:0,
    inputTxt:''//输入内容
  },
onLoad :function(){
  var _this=this;
  wx.request({
    url: 'http://127.0.0.1:3000/datalist',
    success:function(res){
      _this.setData({
        datalist:res.data
      })
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
},

//服务搜索
serverinput:function(e){
  var inputTxt=e.detail.value
  this.setData({
    inputTxt:inputTxt
  })
  wx.request({
    method: "POST",
    url: 'http://127.0.0.1:3000/looklist',
    data:inputTxt,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success:function(e){
      console.log("success")
    }
  })
},
people:function(){
  wx.navigateTo({ url: '/pages/people/people' })
}
})
