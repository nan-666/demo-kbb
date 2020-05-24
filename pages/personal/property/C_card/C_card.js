// pages/personal/property/C_card/C_card.js
Page({
<<<<<<< HEAD
=======
  data: {
    // cardlist: [
    //   {
    //     id: 1,
    //     image: "http://q9xwl365p.bkt.clouddn.com/personal/property/C_card/zggsyh.png",
    //     name: "中国工商银行",
    //     number: "尾号****",
    //     card: "储蓄卡"
    //   },
    //   {
    //     id: 2,
    //     image: "http://q9xwl365p.bkt.clouddn.com/personal/property/C_card/zgjsyh.png",
    //     name: "中国建设银行",
    //     number: "尾号****",
    //     card: "储蓄卡"
    //   }
    // ]
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:3000/getC_card/',
      //method:'GET'            //GET请求方式为默认，可以不写
      success:function(res){
        _this.setData({cardlist:res.data})
      }
    })
  },
>>>>>>> hcy
  toA_card: function() {
    wx.navigateTo({
      url: '/pages/personal/property/A_card/A_card',
    })
  }
})