//index.js
var app=getApp()
Page({
  data:{
    items:0,
    tabs:0,
    item:0,
    alllist:[],
    acceptedlist:[],
    servicelist:[],
    evaluatelist:[],
    refundlist:[],
    service:'',
    index:0,
    smoney:0,
  },
  changeItems(e) {
    var items = e.currentTarget.dataset.item;
    this.setData({
      items: items
    });
    
  },
  // 滑块滑动时的监听函数
  changeTabs: function (e) {
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tabs: e.detail.current
    })
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
    this.getData();
  }
  },
  getData:function(){
    var _this=this; 
    var {alllist} = this.data;
    var {acceptedlist} = this.data;
    var {servicelist} = this.data;
    var {evaluatelist} = this.data;
    var {refundlist} = this.data;
    wx.request({ 
      url: 'http://localhost:8080/kbb/main/java/action/order', 
      method:'POST', 
      data: {
        userId:app.gobalData.userId
      },
      header:{ 
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }, 
      success:function(res){ 
        for(var i = 0;i < res.data.length;i++){
          let {id,describe,address,type,money,time,img_1,state} = res.data[i]
          var orderData = {id,describe,address,type,money,time,img_1,state}
          alllist.push(orderData);
          if(res.data[i].state == '订单创建'){
            servicelist.push(orderData);
          } else if(res.data[i].state == '已接受'){
            acceptedlist.push(orderData)
          } else if (res.data[i].state == '已完成'){
            evaluatelist.push(orderData)
          } else if(res.data[i].state == '订单关闭'){
            refundlist.push(orderData)
          }
          _this.setData({
            alllist,
            acceptedlist,
            servicelist,
            evaluatelist,
            refundlist
          })
        }
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