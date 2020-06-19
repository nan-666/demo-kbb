// pages/task/Release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    _data:null,
   picker:{
    arr: ['管道维修','电脑维修','家庭保洁','家电维修','专业咨询','心理咨询','上门安装','装修','生活配送','拉家搬货','家电清洗','上门回收','衣物洗护'],
    index: 0
  },
  images: [],
  imageurls:[],
  date: '2020-07-01',
  region: ['江西省', '九江市', '濂溪区'],

  requirement_focus: false,
  information_focus: false,
  name_focus: false,
  phone_focus: false,
  money_focus: false
  },
  // 选取服务类型
  pickerChange: function(e){
    this.setData({
      'picker.index': e.detail.value
    })
  },

  // 获取焦点时监听
  inputFocus: function(e){
    var id = e.currentTarget.id;
    if(id === 'requirement'){
      this.setData({requirement_focus: true})
    }
    if(id === 'information'){
      this.setData({information_focus: true})
    }
    if(id === 'name'){
      this.setData({name_focus: true})
    }
    if(id === 'phone'){
      this.setData({phone_focus: true})
    }
    if(id === 'money'){
      this.setData({money_focus: true})
    }
  },

  //校验服务要求
  requirementChange: function(){
    this.setData({requirement_focus: false})
  },

  //校验服务信息
  informationChange: function(){
    this.setData({information_focus: false})
  },

  // 校验姓名
  nameChange: function(e){
    var name = e.detail.value;
    this.checkName(name);
    this.setData({name_focus: false})
  },

  checkName: function(name){
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return this.check(name, reg, '姓名输入有误！');
  },

  //校验电话号码
  phoneChange: function(e){
    var phone = e.detail.value;
    this.checkPhone(phone);
    this.setData({phone_focus: false})
  },

  checkPhone: function(phone){
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(phone, reg, '电话输入有误！');
  },

  // 封装统一校验函数
  check: function(data,reg, errMsg){
    if(data!=''&&!reg.test(data)){      // reg.test()正则校验，正确返回true，错误返回false
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },

  //校验日期
  dateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //校验地区
  regionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //校验佣金
  moneyChange: function(){
    this.setData({money_focus: false})
  },
  // 照片上传方法
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx,1)
    this.setData({
      images: images
    })
  },
 
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  
  // 提交表单
  formSubmit: function(e){
    var name = e.detail.value.name,
      phone = e.detail.value.phone;
    if(name === '' || phone === ''){
      wx.showToast({
        title: '姓名或电话不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }

    if(!this.checkName(name) || !this.checkPhone(phone)){
      wx.showToast({
        title: '姓名或电话填写有误',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    //上传图片到七牛云
    var list = [];
    const qiniuUploader = require("../../utils/qiniuUploader");
    for(var i=0;i< this.data.images.length;i++){
      const options = {     // 设置七牛上传参数
        region: 'ECN',      // 空间所在区域，ECN为华东区
        domain: 'http://qbboxshzh.bkt.clouddn.com',  // 域名，试用阶段为测试域名（30天有效期）
        uptokenURL: 'http://127.0.0.1:8080/kbb//GetQiniuToken',  // 开发中服务器提供的获取上传凭证token的接口
        key: 'image/upload/'+(new Date()).valueOf()+'.jpg'     // 指定文件key，在服务端可生成同名文件覆盖的上传凭证
      };
      qiniuUploader.upload(this.data.images[i], (res)=>{     // 上传成功，返回图片的key及url
        var imgUrl = res.imageURL;
        // 同名图片覆盖后，因为浏览器有缓存的原因，不能立刻预览到最新图片，此时需要通过在url中添加唯一参数来强制去除缓存
        var imgNewUrl = imgUrl + '?a=' + (new Date()).valueOf();
        console.log(imgNewUrl);
        // 将图片url存入自己的服务器数据库
        list.push(imgNewUrl)

      }, (error)=> {      // 上传错误，打印错误信息
        console.log('error' + error)
      }, options, (progress)=>{       // 上传进度
        
      }, null, null , (complete)=>{
        
      })
    }
    var that = this
    setTimeout(function() {
      that.setData({
        imageurls:list
      })
      
      //向后台提交任务数据
      wx.request({
        url: 'http://localhost:8080/kbb/task/post_task',
        method:'POST',
        data:{
              "num" : that.data.picker.index,
              "userId":that.data._data.userId,
              "requirement" : e.detail.value.requirement,
              "phone" : e.detail.value.phone,
              "date" : that.data.date,
              "region" : that.data.region[0]+that.data.region[1]+that.data.region[2],
              "money" : e.detail.value.money,
              "images" : that.data.imageurls
            },
          header:{
              "Accept": "application/json, text/javascript, */*; q=0.01",
              "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
            },
        success:function(res){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          
        }
      })
    }, 3000);

    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var _data = wx.getStorageSync('_data')
    this.setData({_data:_data})
      
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