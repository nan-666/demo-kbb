// pages/task/Release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    //最上面的图标
    topicon:[{
      id: 1,
      title: '预约服务',
      coverImgUrl: 'http://q9xwl365p.bkt.clouddn.com/task/Release/yyfw.png',
    },{
      id: 2,
      title: '匹配人员',
      coverImgUrl: 'http://q9xwl365p.bkt.clouddn.com/task/Release/ppry.png',
    },{
      id: 3,
      title: '订单服务',
      coverImgUrl: 'http://q9xwl365p.bkt.clouddn.com/task/Release/ddfw.png',
    },{
      id: 4,
      title: '订单完成',
      coverImgUrl: 'http://q9xwl365p.bkt.clouddn.com/task/Release/ddwc.png',
    },],

       // 
   picker:{
    arr: ['管道维修','电脑维修','家政保洁','家电维修','专业咨询','心理咨询','上门安装'],
    index: 1
  },

  
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
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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