//index.js

Page({
  data:{
    item: 0,
    tab: 0,
    items:0,
    tabs:0,
    inputTxt:'',//输入内容
    datalist:[],
    newlist:[],
    moneylist:[],
    word:'',
    type:'',
    rank:''
  },
  getData:function(){
    this.setData({
      datalist:[],
      newlist:[],
      moneylist:[]
    });
    var _this=this;
    var {datalist} = this.data;
    var {newlist} = this.data;
    var {moneylist} = this.data;
    wx.request({
      url: 'http://localhost:8080/kbb/order',
      success:function(res){
        for(var i = 0;i < res.data.length;i++){
          if(res.data[i].state == '订单创建'){
            let {id,describe,address,type,money,time} = res.data[i]
            var orderData = {id,describe,address,type,money,time}
            datalist.push(orderData);
            newlist.push(orderData);
            moneylist.push(orderData);
          }
          _this.setData({
            datalist,
            newlist:newlist.sort((prev, next) => Date.parse(next.time) - Date.parse(prev.time)),
            moneylist:moneylist.sort((prev,next) => next.money - prev.money)
          })
        }
        
      }
    })
  },
  // 标签栏点击监听
  changeItem(e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      item: item
    })
    if(this.data.item == 1){
      this.getData();
    }
  },
  // 滑块滑动时的监听函数
  changeTab: function (e) {
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tab: e.detail.current
    })
    if(this.data.tab == 1){
      this.getData();
    }
  },
  // 任务大厅标签栏点击监听
  changeItems(e) {
    var items = e.currentTarget.dataset.item;
    this.setData({
      items: items
    });
    
  },
  // 任务大厅滑块滑动时的监听函数
  changeTabs: function (e) {
    // e.detail.current为当前显示页面的索引号
    this.setData({
      tabs: e.detail.current
    })
  },
  //筛选部分的js
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  translate: function () {
    this.setData({
      isRuleTrue: true
    })
    this.animation.translate(-245, 0).step()
    this.setData({ animation: this.animation.export() })
  },
  tryDriver: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type:type
    })
  },
  Rank:function(e){
    var rank = e.currentTarget.dataset.rank;
    this.setData({
      rank:rank
    })
  },
  complete: function () {
    this.setData({
      isRuleTrue: false,
    })
    if(this.data.type){
      this.setData({
        datalist:[],
        newlist:[],
        moneylist:[]
      });
      var _this=this;
      var {datalist} = this.data;
      var {newlist} = this.data;
      var {moneylist} = this.data;
      wx.request({
        url: 'http://localhost:8080/kbb/screen',
        method:'POST',
        data:{"type":_this.data.type},
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          for(var i = 0;i < res.data.length;i++){
            if(res.data[i].state == '订单创建'){

              let {id,describe,address,type,money,time} = res.data[i]
              var orderData = {id,describe,address,type,money,time}
              datalist.push(orderData);
              newlist.push(orderData);
              moneylist.push(orderData);
            }
            if(_this.data.rank == '从低到高'){
              _this.setData({
                datalist,
                newlist:newlist.sort((prev, next) => Date.parse(next.time) - Date.parse(prev.time)),
                moneylist:moneylist.sort((prev,next) => prev.money - next.money)
              })
            } else{
              _this.setData({
                datalist,
                newlist:newlist.sort((prev, next) => Date.parse(next.time) - Date.parse(prev.time)),
                moneylist:moneylist.sort((prev,next) => next.money - prev.money)
              })
            } 
          }
        }
      })
    }
    this.animation.translate(0, 0).step()
    this.setData({ animation: this.animation.export() })
  },
  reset:function(){
    this.setData({
      type:''
    })
  },
  //搜索功能
  goSearch: function(e) {
    var formData = e.detail.value;
    if (formData) {
      wx.navigateTo({
        url: '/pages/index/search/result/result?data='+formData,
      })
    }
  },

  search:function(e){
    var word = e.detail.value;
    this.setData({
      word:word,
      datalist:[],
      newlist:[],
      moneylist:[]
    })
    if (this.data.word) {
      
      
      var {datalist} = this.data;
      var {newlist} = this.data;
      var {moneylist} = this.data;
      var _this=this;
      wx.request({
        url: 'http://localhost:8080/kbb/searchTask',
        method:'POST',
        data:{"word":_this.data.word},
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          for(var i = 0;i < res.data.length;i++){
            if(res.data[i].state == '订单创建'){

              let {id,describe,address,type,money,time} = res.data[i]
              var orderData = {id,describe,address,type,money,time}
              datalist.push(orderData);
              newlist.push(orderData);
              moneylist.push(orderData);
            }
            _this.setData({
              datalist,
              newlist:newlist.sort((prev, next) => Date.parse(next.time) - Date.parse(prev.time)),
              moneylist:moneylist.sort((prev,next) => next.money - prev.money)
            })
          }
          
        }
      })
    } 
  },
  btnclick: function(e) {
    wx.navigateTo({ url: '/pages/map/map' })
  },
  //下拉刷新
  // 点击跳转至服务页面
  toService: function(e) {
    var formData = e.currentTarget.dataset.keyword;
    wx.navigateTo({
      url: '/pages/index/search/result/result?data='+formData,
    })
  },
  // 点击跳转至分类页面
  toClassify: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/portal/classify/classify',
    })
  },
  //点击跳转至活动页面
  toActivity:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/activity/activity',
    })
  },
  //点击跳转至装修设计页面
  toDesign:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/design/design',
    })
  },
  //点击跳转至智能管家页面
  toIntelligence:function(){
    wx.navigateTo({
      url: '/pages/index/recommend/intelligence/intelligence',
    })
  },
//点击话题内容跳转到帖子详情页
toDetails:function(){
  wx.navigateTo({
    url: '/pages/index/task-detail/detail',
  })
},

people:function(){
  wx.navigateTo({ url: '/pages/people/people' })
}

})

