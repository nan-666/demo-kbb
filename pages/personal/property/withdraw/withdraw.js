// pages/personal/property/withdraw/withdraw.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
    inputmoney:0,
    money:0,
    title:"预计两个小时内到账，确认提现",
    id:0,
  },

  // 点击银行卡跳转到选择银行卡页
  toC_card: function() {
    wx.navigateTo({
      url: '/pages/personal/property/C_card/C_card',
    })
  },
  //获取输入金额
  moneyChange:function(e){
    this.setData({
      inputmoney:e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      balance:app.gobalData.balance,
      id:options.id,
      money:options.money,
    })
  },

  //post
  formSubmit:function(){
    var _this=this;
    var updatemoney=0;
    if(_this.data.money){
      updatemoney=parseInt(_this.data.balance)-parseInt(_this.data.money);
      if(updatemoney<0){
        wx.showModal({
          title: '提示',
          content: '余额不足',
          success (res) {
          if (res.confirm) {
          
          } else if (res.cancel) {
          wx.navigateBack()
          }
          }
          })
      }
      wx.request({
        method:'POST',
        url: 'http://localhost:8080/kbb//main/java/action/updatebill', 
        data:{
          userid:app.gobalData.userId,
          inputmoney:updatemoney
        },
        header:{ 
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }, 
        success:function(res){ 
          console.log(res);
          wx.request({
            method:'POST',
            url: 'http://localhost:8080/kbb//main/java/action/upstate', 
            data:{
              id:_this.data.id,
              state:1
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
          }
      })
    }else{
    updatemoney=parseInt(_this.data.balance)-parseInt(_this.data.inputmoney);
    console.log(updatemoney);
    wx.request({
      method:'POST',
      url: 'http://localhost:8080/kbb//main/java/action/updatebill', 
      data:{
        userid:app.gobalData.userId,
        inputmoney:updatemoney
      },
      header:{ 
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }, 
      success:function(res){ 
        console.log(res);
          wx.reLaunch({
            url: '/pages/personal/property/balance/balance',
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