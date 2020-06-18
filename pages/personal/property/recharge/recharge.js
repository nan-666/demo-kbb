// pages/personal/property/recharge/recharge.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputmoney:0,
    balance:0
  },

  // 点击银行卡跳转到选择银行卡页
  toC_card: function() {
    wx.navigateTo({
      url: '/pages/personal/property/C_card/C_card',
    })
  },

  onLoad:function(){
    this.setData({
      balance:app.gobalData.balance,
    })
  },
  //获取输入金额
  inputmoney:function(e){
    this.setData({
      inputmoney:e.detail.value,
    })
  },
  //post
  formSubmit:function(){
    var _this=this;
    var updatemoney=parseInt(_this.data.inputmoney)+parseInt(_this.data.balance);
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
  },
  })