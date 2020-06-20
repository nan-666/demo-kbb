// pages/peopledetail/appointment/appointment.js
Page({
  data:{
    date: '2020-07-01',
    _data:null,
    region: ['江西省', '九江市', '濂溪区'],
    merchantid:'',
    type:''
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
  onLoad: function (options) {
    var id = options.id;
    var type = options.type;
    var _data = wx.getStorageSync('_data')
    this.setData({_data:_data,merchantid:id,type:type})
  },
  checkName: function(name){
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return this.check(name, reg, '姓名输入有误！');
  },
  checkPhone: function(phone){
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(phone, reg, '电话输入有误！');
  },

  //表单提交
  formSubmit:function(e){
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
      var that = this;
      //向后台提交任务数据
      wx.request({
        url: 'http://localhost:8080/kbb/appointment',
        method:'POST',
        data:{
              "userId":that.data._data.userId,
              "merchantid":that.data.merchantid,
              "requirement" : e.detail.value.beizhu,
              "phone" : e.detail.value.tel,
              "date" : that.data.date,
              "region" : that.data.region[0]+that.data.region[1]+that.data.region[2],
              "money" : e.detail.value.money,
              "type":that.data.type
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
    },
})