//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},

  onLoad: function () {
    var _this = this;
    wx.showLoading({
      title: '正在同步数据',
      mask: true
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
      url: '../search/search?type=user' // type分为用户和群
    })
  }
})