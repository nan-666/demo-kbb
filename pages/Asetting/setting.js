// pages/Asetting/setting.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'http://qbboxshzh.bkt.clouddn.com/forum/index/tx.jpg',
    userInfo:{},
    // username: '',
    // gender:[{
    //       sex:'男',
    //       value:'0',
    //       checked:true
    //     },
    //     {
    //       sex:'女',
    //       value:'1',
    //       checked:false
    //     }],
    // cellphone: '',
    // date: '2016-09-01',
    // intro: '',
    // label: '',
    // industry: '',
    nickname:'',
    gender:'',
    phone:'',
    birthday:'',
    tag:'',
    sort:'',
    industry:''
  },

  // 选择头像，wx.chooseImage从本地相册选择图片或使用相机拍照
  changeAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          imgUrl: tempFilePaths[0]
        })
      },
    })
  },

  // 选择生日
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/kbb/main/java/action/getuserinfo',
      method: 'POST',
      data: {
        userid:app.gobalData.userId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0])
        _this.setData({
          infodata:res.data[0],
        })
      }
    })
  },



  submit:function(e){
    console.log(e.detail.value)
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/kbb/main/java/action/settingmsg',
      method: 'POST',
      data: {
        userid:app.gobalData.userId,
              nickName: _this.data.nickName,
              avatarUrl:_this.data.avatarUrl,
              gender:_this.data.gender,
              phone:_this.data.city,
              birthday:_this.data.birthday,
              information:_this.data.city,
              sort:_this.data.city,
              work:_this.data.city,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        
      }
    })
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