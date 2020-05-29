// pages/login/login.js
var app = getApp();   // 获取app实例
Page({

  data: {
    userIDList: new Array(30).fill().map(function(item, idex){    // 模拟30个用户id
      return 'user' + idex;
    }),
    selectedIndex: 1,  // picker默认选中项
    loading: false    // 按钮加载效果
  },

  pickerChange:function(e){
    var index = e.detail.value;
    this.setData({
      selectedIndex: index
    })
  },

  login: function(){
    var userId = this.data.userIDList[this.data.selectedIndex];
    wx.request({
      url: 'http://127.0.0.1:8080/kbb/GetUserSig',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data:{userId: userId},
      success: (res) => {
        if(res.data.success){
          app.tim.login({
            userID: userId,
            userSig: res.data.data.userSig
          }).then((imResponse) => {           // 登录成功
            // 登录成功后将当前用户存入app的全局对象中
            app.gobalData.userId = userId;
            // 跳转到首页
            wx.navigateTo({
              url: '../index/index',
            })
          }).catch((imError) => {
            console.log('login error：', imError);    // 登录失败的相关信息
          })
        }
      }
    })
  }
})
