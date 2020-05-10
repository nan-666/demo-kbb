// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    block:[{
      id: 1,
      title: "行业干货"
    },
    {
      id: 2,
      title: "趋势热点"
    },
    {
      id: 3,
      title: "生活小技巧"
    },
    {
      id: 4,
      title: "爆款设计"
    },
    {
      id: 5,
      title:"行业机会"
    },
    {
      id: 6,
      title:"全部话题"
    }],
    backgroundImgUrl:"http://q9xwl365p.bkt.clouddn.com/forum/index/ltbk.png"
  },

  //点击话题内容跳转到帖子详情页
  toDetails:function(){
    wx.navigateTo({
      url: '/pages/forum/Fdetails/details',
    })
  }
})