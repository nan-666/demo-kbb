// pages/Asetting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'http://qbboxshzh.bkt.clouddn.com/forum/index/tx.jpg',
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
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:3000/getset/',
      //method:'GET'            //GET请求方式为默认，可以不写
      success:function(res){
        _this.setData(res.data)
      }
    })
  },

  submit:function(e){
    //发送数据到服务端
    wx.request({
      url: 'http://127.0.0.1:3000',          //服务端接口
      method: 'POST',                         //请求方式：‘GET’、‘POST’，其中‘GET’方式为默认可不写
      data: e.detail.value,                  //发送的参数
      success: function(res){                //服务端响应成功，结果由res,data带回
        console.log(res)
      }    
    })
    // 关闭本页面，返回上一个页面
    wx.navigateBack();    
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