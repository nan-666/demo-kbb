// pages/map/map.js
Page({
  data:{
    latitude: 29.674771,
    longitude: 116.004630,
    markers: [
      {
        id: 0,
        iconPath: 'http://qbboxshzh.bkt.clouddn.com/map/map/navi.png',    // 标记物图标
        latitude: 29.674771,
        longitude: 116.004630,
        width: 30,
        height: 30
      }
    ]
  },

  markertap: function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: '新天地建国酒店',
      address: '江西省九江市濂溪区550号'
    })
  },

  onLoad: function(){
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function(res){     // 定位成功，返回用户当前坐标
    //     wx.openLocation({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //     })
    //   }
    // })
  }
})