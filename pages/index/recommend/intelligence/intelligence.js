// pages/index/recommend/design/design.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['江西省', '九江市', '濂溪区'],
  },
  //校验地区
  regionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
})