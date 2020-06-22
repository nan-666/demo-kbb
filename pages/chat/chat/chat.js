// pages/chat/chat.js
var emoji = require('../../../utils/emoji.js')
var app = getApp()
Page({
  data: {
    _userInfo:[],
    messageContent: '', // 用户输入消息
    toAccount: '', // 会话用户ID
    conversation: {},
    count: 15,
    isEmojiOpen: false,
    isMoreOpen: false,
    isFocus: false,
    isGroup: false,
    emojiName: emoji.emojiName(),
    emojiMap: emoji.emojiMap(),
    emojiUrl: emoji.emojiUrl(),
    currentMessageList: [],
    height: 0,
    isShow: false,
    faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/',
    emojiShow: true,
    bigEmojiShow: false,
    bigEmoji: ['tt01', 'tt02', 'tt03', 'tt04', 'tt05', 'tt06', 'tt07', 'tt08', 'tt09', 'tt10', 'tt11', 'tt12', 'tt13', 'tt14', 'tt15', 'tt16'],
  },

  onShow: function(){
    this.setData({
      isShow: true
    })
  },

  onLoad: function(options){
    var _this = this;
    var _data = wx.getStorageSync('_data');
    this.setData({
      _data:_data
    })
    var _userInfo = wx.getStorageSync('_userInfo')
    this.setData({
      _userInfo:_userInfo
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








    var toAccount = options.toAccount;
    this.setData({
      toAccount: toAccount
    })
    // 设置当前页面的的标题
    wx.setNavigationBarTitle({
      title: toAccount,
    })

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          'sysInfo.windowWidth': res.windowWidth,
          'sysInfo.windowHeight': res.windowHeight
        })
        var query = wx.createSelectorQuery();   // 新建查询器
        // 处理接收到新消息事件的回调函数
        let onMessageReceived = function (event) {
          var list = _this.data.currentMessageList;
          for (var i = 0; i < event.data.length; i++) {   // 将新消息插入到消息列表
            list.push(event.data[i]);
          }
          _this.parseEmoji(list);     // 处理发送信息中，文字与表情图标混排的情况
          _this.setData({
            currentMessageList: list
          })
          // 接收到新消息，自动滚动到底部
          query.select('#chat').boundingClientRect(function (res) {
            if (res.bottom - _this.data.sysInfo.windowHeight < 150) {
              _this.scrollToBottom();
            }
          }).exec();
        };
        
      },
    })

    // 下拉刷新，获取最新的历史聊天列表
    this.onPullDownRefresh();
  },

  onPullDownRefresh: function(){
    this.getMessageList();
  },

  getMessageList: function(){
    var _this = this;
    var promise = app.tim.getMessageList({    // 调用腾讯IM接口，获取历史聊天列表
      conversationID: 'C2C' + this.data.toAccount,   // id为聊天人的userId
      // count: 10     // 一次拉取的聊天条数
    })
    promise.then(function(imResponse){
      var messageList = imResponse.data.messageList;    // 消息列表
      // var nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      // var isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。

      // 对所有消息进行表情符号的处理
      _this.parseEmoji(messageList);
      // 设置当前消息列表
      _this.setData({
        currentMessageList: messageList
      })
      // 停止刷新
      wx.stopPullDownRefresh();
      setTimeout(function(){
        _this.scrollToBottom();
      }, 500)
    })
  },

  // 滚动到列表bottom
  scrollToBottom: function(){
    if(this.data.isShow){
      wx.pageScrollTo({
        scrollTop: 99999
      })
    }
  },

  // 处理信息中文字和表情图标混排的情况，解析出文字与表情
  parseEmoji: function(messageList){
    var _this = this;
    for (var i = 0; i < messageList.length; i++) {
      var divs = [];
      if (messageList[i].type === 'TIMTextElem') {
        var text = messageList[i].payload.text;
        var start, end;
        while ((start = text.indexOf('[')) >= 0) {
          if ((end = text.indexOf(']')) >= 0) {
            var emojiStr = text.substring(start, end + 1);
            var isEmoji = false;
            for (var j = 0; j < _this.data.emojiName.length; j++) {
              if (emojiStr === _this.data.emojiName[j]) {
                var div1 = {},
                  div2 = {};
                if (start == 0) {
                  div1.type = 'img';
                  div1.text = emojiStr;
                  divs.push(div1);
                } else {
                  div1.type = 'span';
                  div1.text = text.substring(0, start);
                  div2.type = 'img';
                  div2.text = emojiStr;
                  divs.push(div1);
                  divs.push(div2);
                }
                isEmoji = true;
                break;
              }
            }
            if (!isEmoji) {
              var div1 = {};
              div1.type = 'span';
              div1.text = text.substring(0, end + 1);
              divs.push(div1);
            }
            text = text.substring(end + 1);
          } else {
            var div1 = {};
            div1.type = 'span';
            div1.text = text;
            divs.push(div1);
            break;
          }
        }
        if (text !== '') {
          var div1 = {};
          div1.type = 'span';
          div1.text = text;
          divs.push(div1);
        }
        messageList[i].divs = divs;
      } else {
        continue;
      }
    }
  },

  // 监听消息输入
  messageInput: function(e){
    this.setData({
      messageContent: e.detail.value
    })
  },

  // 处理表情选项卡
  handleEmoji: function(){
    if(this.data.isFocus){
      this.setData({
        isFocus: false,
        isEmojiOpen: true
      })
    }else{
      this.setData({
        isEmojiOpen: !this.data.isEmojiOpen,
        isMoreOpen: false
      })
    }
  },

  // 处理更多选项卡
  handleMore: function () {
    if (this.data.isFocus) {
      this.setData({
        isFocus: false,
        isMoreOpen: true
      })
    } else {
      this.setData({
        isMoreOpen: !this.data.isMoreOpen,
        isEmojiOpen: false
      })
    }
  },

  // 选项卡关闭
  handleClose: function () {
    this.setData({
      rateModal: false,
      isFocus: false,
      isMoreOpen: false,
      isEmojiOpen: false
    })
  },

  // 切换Emoji和BigEmoji的显示
  handleEmojiShow: function () {
    this.setData({
      emojiShow: true,
      bigEmojiShow: false
    })
  },

  handleBigEmojiShow: function () {
    this.setData({
      emojiShow: false,
      bigEmojiShow: true
    })
  },

  // 发消息选中emoji
  chooseEmoji: function (e) {
    this.setData({
      messageContent: this.data.messageContent += e.currentTarget.dataset.item
    })
  },

  // 选中大图标消息
  chooseBigEmoji: function (e) {
    var _this = this;
    var message = app.tim.createFaceMessage({
      to: this.data.toAccount,
      conversationType: 'C2C',
      payload: {
        index: 1,
        data: e.currentTarget.dataset.item
      }
    });
    let promise = app.tim.sendMessage(message);
    promise.then(function (imResponse) {
      var message = imResponse.data.message;
      var list = _this.data.currentMessageList;
      list.push(message);
      _this.setData({
        currentMessageList: list
      });
      _this.scrollToBottom();
    }).catch(function (imError) {
      console.warn('sendMessage error:', imError); // 发送失败
    });
    this.setData({
      messageContent: ''
    });
  },

  sendMessage: function(){
    var _this = this;
    if (this.data.messageContent != '') {
      var message = app.tim.createTextMessage({
        to: this.data.toAccount,
        conversationType: 'C2C',
        payload: {
          text: this.data.messageContent
        }
      });
      let promise = app.tim.sendMessage(message);
      promise.then(function (imResponse) {
        var message = imResponse.data.message;
        var list = _this.data.currentMessageList;
        list.push(message);
        _this.parseEmoji(list);
        _this.setData({
          currentMessageList: list
        });
        _this.scrollToBottom();
      }).catch(function (imError) {
        console.warn('sendMessage error:', imError); // 发送失败
      });
      this.setData({
        messageContent: ''
      });
    } else {
      wx.showToast({
        title: '消息不能为空',
      });
    }
    this.setData({
      isFocus: false,
      isEmojiOpen: false,
      isMoreOpen: false
    })
  }
})