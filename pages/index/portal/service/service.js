// pages/index/portal/service/service.js
Page({
  data:{
    item: 0,
    tab: 0,
    keyword:'',
    recommendlist:'',
    fivestarlist:'',
    citylist:'',
    newlist:'',
    //入驻用户信息
  //   fivestarlist:[
  //     {
  //       imgUrl:'http://qbboxshzh.bkt.clouddn.com/forum/index/tx.jpg',
  //       title:'xxxx专业电脑维修',
  //       rank:'5.0',
  //       star1:5,
  //       star2:0,
  //     },
  //     {
  //       imgUrl:'http://qbboxshzh.bkt.clouddn.com/forum/index/tx.jpg',
  //       title:'xxxx专业电脑维修',
  //       rank:'5.0',
  //       star1:5,
  //       star2:0,
  //     }
  //   ]
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

  onLoad: function (options) {
    var _this = this;
    var keyword = options.keyword;
    console.log(options.keyword)
    this.setData({
        keyword:keyword,
    })
    //向后台请求数据
    wx.request({
      url: 'http://127.0.0.1:3000',
      method:'POST',
      data:keyword,
      success:function(res){
        // 设商家列表数据
        for(var i = 0; i < res.data.length; i++){
          if(res.data[i].title == '推荐'){
            _this.setData({
              recommendlist: res.data[i].Info
            })
          } else if(res.data[i].title == '五星评价'){
            _this.setData({
              fivestarlist: res.data[i].Info
            })
          } else if(res.data[i].title == '同城商家'){
            _this.setData({
              citylist: res.data[i].Info
            })
          } else {
            _this.setData({
              newlist: res.data[i].Info
            })
          }
        }
      }
    })
  }
})