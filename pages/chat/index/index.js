//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    _data:null
  },

  onLoad: function () {
    var _this = this;
    wx.showLoading({
      title: '正在同步数据',
      mask: true
    })
    var _data = wx.getStorage({
      key: '_data',
    });
    this.setData({
      _data:_data
    })
    var userId = _data.userId+"";
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
          }).catch((imError) => {
            console.log('login error：', imError);    // 登录失败的相关信息
          })
        }
      }
    })
    if (!app.gobalData.isSdkReady) {
      let onSdkReady = function (event) {
        _this.onPullDownRefresh();
      };
      app.tim.on(app.event.SdkReady, onSdkReady); // 注册SdkReady监听器，当IM的sdk处于Ready状态后回调
    } else {
      _this.onPullDownRefresh();
    }
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    var promise = app.tim.getConversationList(); // 获取近期会话列表
    promise.then((imResponse) => { // 获取会话列表成功
      wx.hideLoading();
      this.setData({
        allConversation: imResponse.data.conversationList
      })
      wx.stopPullDownRefresh();
    }).catch((imError) => {})
  },

  startSession: function () {
    wx.navigateTo({
      url: '/pages/chat/search/search?type=user' // type分为用户和群
    })
  },

  goChat: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/chat/chat/chat?toAccount=' + id     // 将聊天对方ID传递到会话页面
    })
  }
})