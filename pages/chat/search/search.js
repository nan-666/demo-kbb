// pages/search/search.js
var app = getApp()
Page({

  data: {
    type: '',   // user、group
    ID: '',
    searchedID: '',
    searched: false,
    loading: false,
    buttonText: ''
  },

  onLoad: function(options){
    var type = options.type;
    this.setData({
      type: type
    })
    if(type == 'user'){
      this.setData({
        buttonText: '发起会话'
      })
      wx.setNavigationBarTitle({
        title: '发起会话',
      })
    }else{
      this.setData({
        buttonText: '申请加群'
      })
      wx.setNavigationBarTitle({
        title: '加入群聊',
      })
    }
  },

  bindInput: function(e){
    if(this.data.searchedID === '' || this.data.ID !== this.data.searchedID){
      this.setData({
        searched: false
      })
    }
    this.setData({
      ID: e.detail.value
    })
  },

  search: function(){
    if(this.data.ID === ''){
      return;
    }

    // 开始搜索
    wx.showLoading({
      title: '正在搜索',
    })

    app.tim.getUserProfile({
      userIDList: [this.data.ID]    // 必须传递数组参数
    }).then(((_ref2) => {
      var data = _ref2.data;
      wx.hideLoading();
      if (data.length === 0) {    // 如果搜索结果为空
        wx.showToast({
          title: '未找到该用户',
          duration: 1000,
          icon: 'none'
        });
        return;
      }
      this.setData({
        searched: true,
        searchedID: this.data.ID
      });
    })).catch((error) =>{
    })
  },

  clickTap: function(){
    if (this.data.type === 'user') {
      this.createConversation(); // 发起会话
    } else {
      this.joinGroup(); // 加入群，未实现
    }
  },

  // 发起会话，跳转到会话页面
  createConversation: function(){
    wx.navigateTo({
      url: '/pages/chat/chat/chat?toAccount=' + this.data.ID     // 将聊天对方ID传递到会话页面
    })
  },

  joinGroup: function(){
  }
})