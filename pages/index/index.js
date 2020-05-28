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
  },

  //搜索功能
  goSearch: function(e) {
    var formData = e.detail.value;
    if (formData) {
      wx.navigateTo({
        url: '/pages/index/search/result/result?data='+formData,
      })
    }
  },

  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/map/map' })
  },

  // 点击跳转至服务页面
  toService: function(e) {
    var keyword = e.currentTarget.dataset.keyword;
    wx.navigateTo({
      url: '/pages/index/portal/service/service?keyword='+keyword,
    })
  },
  // 点击跳转至分类页面
  toClassify: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/portal/classify/classify',
    })
  },
  //点击任务跳转到任务详情页
  toDetails:function(){
    wx.navigateTo({
      url: '/pages/index/task-detail/detail',
    })
  },
  //点击跳转至活动页面
  toActivity:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/activity/activity',
    })
  },
  //点击跳转至装修设计页面
  toDesign:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/design/design',
    })
  },
  //点击跳转至智能管家页面
  toIntelligence:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/intelligence/intelligence',
    })
  },
//点击话题内容跳转到帖子详情页
toDetails:function(){
  wx.navigateTo({
    url: '/pages/index/task-detail/detail',
  })
},

//服务搜索
// serverinput:function(e){
//   var inputTxt=e.detail.value
//   this.setData({
//     inputTxt:inputTxt
//   })
//   wx.request({
//     method: "POST",
//     url: 'http://127.0.0.1:3000/looklist',
//     data:inputTxt,
//     header: {
//       'content-type': 'application/x-www-form-urlencoded'
//     },
//     success:function(e){
//       console.log("success")
//     }
//   })
// },
people:function(){
  wx.navigateTo({ url: '/pages/people/people' })
}
})
