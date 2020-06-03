// pages/index/portal/service/service.js
Page({
  data:{
    item: 0,
    tab: 0,
    type:'',
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
    var type = options.keyword
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
        for(var i = 0; i < res.data.length; i++){
          if(res.data[i].star > 3){
            _this.data.recommendlist.push(res.data[i])
          } else if(res.data[i].star == 5){
            _this.data.fivestarlist.push(res.data[i])
          } else if(res.data[i].address == '江西省九江市濂溪区'){
            _this.data.citylist.push(res.data[i])
          } else {
            _this.data.newlist.push(res.data[i])
          }
        }
        _this.setData({
          recommendlist,
          fivestarlist,
          citylist,
          newlist
        })
      }
    })
  }
})