// pages/detail/detail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    id:0,
    money:0,
    state:99,
    spay:0,
  },
  workorder:function(){
    var _this=this; 
    if(parseInt(_this.data.state)==0){
    wx.request({ 
      url: 'http://localhost:8080/kbb//main/java/action/bill', 
      method:'POST', 
      data: {
        userid:app.gobalData.userId
      },
      header:{ 
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }, 
      success:function(res){ 
        console.log(res.data[0].balance);
        app.gobalData.balance=res.data[0].balance;
      } 
    }) 
    wx.navigateTo({
      url: '/pages/personal/property/withdraw/withdraw?money='+_this.data.money+'&id='+_this.data.id,
    })
  }else {

  }
  },
  deleteorder:function(){
    var _this=this;
    console.log(_this.data.id)
    wx.showModal({
      title: '提示',
      content: '是否确定删除当前订单',
      success (res) {
      if (res.confirm) {
        wx.request({ 
          url: 'http://localhost:8080/kbb//main/java/action/deleteorder', 
          method:'POST', 
          data: {
            item:_this.data.id,
          },
          header:{ 
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }, 
          success:function(res){ 
            wx.reLaunch({
              url: '/pages/personal/personal',
            })
          } 
        }) 
      } else if (res.cancel) {
      
      }
      }
      })
  },

  onLoad: function (e) {
    var datas=decodeURIComponent(e.service);
    console.log(JSON.parse(datas))
    var services=JSON.parse(datas)
    this.setData({
      id:services.id,
      money:services.money,
      state:services.state,
    })
    if(parseInt(services.state)==0){
      this.setData({
        content:"去付款",
        spay:'0'
      })
    }else if(parseInt(services.state)==1){
      this.setData({
        content:"待服务ing",
        spay:this.data.money
      })
    }else if(parseInt(services.state)==2){
      this.setData({
        content:"去评价",
        spay:this.data.money
      })
    }else if(parseInt(services.state)==3){
      this.setData({
        content:"查看详情",
        spay:this.data.money
      })
    }
    this.setData({
      service:services,
    })
    
  }
})