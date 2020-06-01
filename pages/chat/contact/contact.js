// 获取App实例
var app = getApp();

Page({
  data: {
    search: '',
    groupedFriends: [],
    indexList: [],
    addUserId: '',
    result: {},
    scrollTop: 0
  },

  onLoad: function () {
    var _this = this;
    // 腾讯IM不提供添加好友功能，可以将与用户聊过天的所有用户id存入自己的数据库中，方便在通讯录中列出
    
    // if(!app.gobalData.isSdkReady){
    //   wx.showLoading({ title: '正在同步数据', mask: true });
    //   let onSdkReady = function (event) {
    //     _this.getFreinds();
    //   };
    //   app.tim.on(app.event.SdkReady, onSdkReady);
    // }else{
    //   _this.getFreinds();
    // }      
  },

  getFreinds: function () {
    // app.tim.getFriendList({
    //   fromAccount: app.gobalData.userId
    // }).then(function (res) {
    //   console.log(res)
    // })
  }
})