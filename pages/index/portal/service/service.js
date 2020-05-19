// pages/index/portal/service/service.js
Page({
  data:{
    item: 0,
    tab: 0,
    id:0,
    recommendlist:'',
    fivestarlist:'',
    citylist:'',
    newlist:'',
    //入驻用户信息
  //   fivestarlist:[
  //     {
  //       imgUrl:'http://q9xwl365p.bkt.clouddn.com/forum/index/tx.jpg',
  //       title:'xxxx专业电脑维修',
  //       rank:'5.0',
  //       star1:5,
  //       star2:0,
  //     },
  //     {
  //       imgUrl:'http://q9xwl365p.bkt.clouddn.com/forum/index/tx.jpg',
  //       title:'xxxx专业电脑维修',
  //       rank:'5.0',
  //       star1:5,
  //       star2:0,
  //     }
  //   ]
  },
  // 标签栏点击监听
  changeItem(e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
  },
  // 滑块滑动时的监听函数
  changeTab: function (e) {
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tab: e.detail.current
    })
  },

  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    console.log(options.id)
    this.setData({
        id:id,
    })
    if(id==0){      // 不能用===
      wx.request({
        url: 'http://127.0.0.1:3001/getList/',
        success: function(res){
          // 设置家电维修列表数据
          console.log(res.data);
          console.log(res.data[0].title);
          console.log(res.data[0].Info);
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data[i].Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }else if(id==1){
      wx.request({
        url: 'http://127.0.0.1:3001/getDelivery/',
        success: function(res){
          // 设置生活配送列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data[i].Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    } else if(id==2){
      wx.request({
        url: 'http://127.0.0.1:3001/getFitment/',
        success: function(res){
          // 设置房子装修列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data[i].Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }  else if(id==3){
      wx.request({
        url: 'http://127.0.0.1:3001/getMove/',
        success: function(res){
          // 设置拉家搬货列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data[i].Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }  else if(id==4){
      wx.request({
        url: 'http://127.0.0.1:3001/getInstall/',
        success: function(res){
          // 设置上门安装列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data.Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }  else if(id==5){
      wx.request({
        url: 'http://127.0.0.1:3001/getPipeline/',
        success: function(res){
          // 设置管道疏通列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data.Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }  else if(id==6){
      wx.request({
        url: 'http://127.0.0.1:3001/getClean/',
        success: function(res){
          // 设置家庭保洁列表数据
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].title == '推荐'){
              _this.setData({
                recommendlist: res.data[i].Info
              })
            } else if(res.data[i].title == '五星评价'){
              _this.setData({
                fivestarlist: res.data[i].Info
              })
            } else if(res.data[i].title == '同城商家'){
              _this.setData({
                citylist: res.data[i].Info
              })
            } else {
              _this.setData({
                newlist: res.data[i].Info
              })
            }
          }
        }
      })
    }       
  }
})