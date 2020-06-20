// pages/personal/property/balance/balance.js
var app=getApp();
Page({

  
//点击充值跳转到充值详情页
toReCharge:function(){
  wx.navigateTo({
    url: '/pages/personal/property/recharge/recharge',
  })
},

//点击提现跳转到提现详情页
toWithdraw:function(){
  wx.navigateTo({
    url: '/pages/personal/property/withdraw/withdraw',
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    var _this=this; 
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
        _this.setData({ 
          balance:res.data[0].balance
        }) 
      } 
    }) 
  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})