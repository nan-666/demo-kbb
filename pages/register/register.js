// pages/Asetting/setting.js
var app=getApp()
Page({

   /**
   * 页面的初始数据
   */
  data: {
    touxiang: '',
    IDjpg:'',
    workjpg:'',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    sexs:[
      {name:'0',value:'男'},
      {name:'1',value:'女',checked:'true'}
    ],
    isSex:"0",
    information:[],
    name:'',
    title:'',
    industry:'',
    userSex:'',
    modalHidden:true
  },
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
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
        console.log(tempFilePaths);
        this.setData({
          touxiang: tempFilePaths[0]
        })
      },
    })
  },
  // 选择头像，wx.chooseImage从本地相册选择图片或使用相机拍照
  changeAvatar1: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        this.setData({
          IDjpg: tempFilePaths[0]
        })
      },
    })
  },
  // 选择头像，wx.chooseImage从本地相册选择图片或使用相机拍照
  changeAvatar2: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        this.setData({
          workjpg: tempFilePaths[0]
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(app.gobalData.islogin==false){
      wx.showModal({
        title: '提示',
        content: '您还没有登录，确定前往登陆，取消返回主页',
        success (res) {
        if (res.confirm) {
        wx.reLaunch({
          url: '/pages/personal/login/login',
        })
        } else if (res.cancel) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
        }
        }
        })
    }else{
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
        console.log("issever"+res.data[0])
        var gender=((res.data[0].sex=="男")?0:1);
        if(gender==1){
          _this.setData({
            sex:_this.data.sexs,
          })
        }
        _this.setData({
          touxiang:res.data[0].avatarUrl,
          isSex:gender,
          information:res.data[0],
        })
      }
    })
  }
  },


  // submit:function(e){
  //   console.log(e.detail.value)
  //   
  // },

  //表单提交
  formSubmit(e){
    console.log(e);
    var userSex=((this.data.isSex==0)?'男':'女');
    console.log(userSex);
    this.setData({
      information: e.detail.value,
      userSex:userSex,
      modalHidden:false
    });
  },
 // 校验姓名
 nameChange: function(e){
  var name = e.detail.value;
  this.setData({name: name})
},


//校验店铺说明
industryChange: function(e){
  var industry = e.detail.value;
  this.setData({industry: industry})
},

//获取店铺名称
titleChange: function(e){
  var title = e.detail.value;
  this.setData({title: title})
},
//获取电话号码
addressChange: function(e){
  var address = e.detail.value;
  this.setData({"information.address": address})
},
//获取地址
phoneChange: function(e){
  var phone = e.detail.value;
  this.setData({"information.phone": phone})
},
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {

    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    app.gobalData.issever=1
    this.setData({
      modalHidden: true,
    })
    var _this=this;
    console.log(_this.data.information);
    wx.request({
      url: 'http://127.0.0.1:8080/kbb/InsetMerchant',
      method: 'POST',
      dataType:"json",
      data: {
        userid:app.gobalData.userId,
        "name": _this.data.name,
        "img":_this.data.touxiang,
        "sex":_this.data.userSex,
        "phone":_this.data.information.phone,
        "address":_this.data.information.address,
        "title":_this.data.title,
        "industry":_this.data.industry
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        }),

         wx.reLaunch({
           url: '/pages/personal/personal?nav=true&isok=true',
         })
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