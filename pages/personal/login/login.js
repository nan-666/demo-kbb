var app=getApp();
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isHide: false
  },

  onLoad: function() {
      var that = this;
      // 验证登录：取出缓存中token
    var token = wx.getStorageSync('token');
    if (token) { // 已有token
      that.checkLogin(token)
      wx.reLaunch({
        url: '/pages/personal/personal?nav=true',
      })
      app.gobalData.islogin=true;
    } else {
      this.login();
      wx.reLaunch({
        url: '/pages/personal/personal?nav=true',
      })
      app.gobalData.islogin=true;
    }
      // 查看是否授权
      wx.getSetting({
          success: function(res) {
              if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                      success: function(res) {
                         // 获取到用户的 code 之后：res.code
                         console.log("用户的code:" + res.code);
                         app.gobalData.userInfo = res.userInfo;
                        }
                        });
              } else {
                  // 用户没有授权
                  // 改变 isHide 的值，显示授权页面
                  that.setData({
                      isHide: true
                  });
              }
          }
      });
  },
  // 校验token有效性
  checkLogin: function (token) {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:8080/kbb/main/java/action/login/CheckLogin',
      method: 'POST',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        var msg=res.data.msg;
        app.gobalData.userId=msg.replace(/[^0-9]/ig,"");
        if(res.data.success){        // token有效，存为全局变量
          app.gobalData.token = token;
          // 全局变量赋值后，执行回调函数，完成index中的操作
          // 如果getCreditCallback不为空，说明在index中定义了getCreditCallback函数，此时将回调执行此函数
          if(_this.getCreditCallback){
            _this.getCreditCallback();
          }
        }else{                  // token无效，重新调用登录获取token
          _this.login();
        }
      }
    })
  },

  login: function () {
    var _this = this;
    // 用户登录
    wx.login({
      success: (res) => {
        console.log("res.code:"+res.code);
        // 发送code到开发者服务器，获取openId等信息，生成token凭证
        wx.request({
          url: 'http://localhost:8080/kbb/main/java/action/login/Login',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            // 将token保存为全局变量，共各页面使用
            app.gobalData.token = res.data.data.token;
            app.gobalData._data = res.data.data;
            app.gobalData.userId=res.data.data.userId;
            // 将token存入缓存，下次打开小程序无需再登录获取token
            wx.setStorage({
              data: res.data.data,
              key: '_data'
            }
            );
            wx.setStorage({
              data: res.data.data.token,
              key: 'token'
            }
            )
          }
        })
      },
    })
  },
  bindGetUserInfo: function(e) {
      console.log(e)
      if (e.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          // 获取到用户的信息了，打印到控制台上看下
          console.log("用户的信息如下：");
          console.log(e.detail.userInfo);
          var ee=e.detail.userInfo;
          wx.request({
            url: 'http://127.0.0.1:8080/kbb/main/java/action/settingmsg',
            method: 'POST',
            dataType:"json",
            data: {
              userid:app.gobalData.userId,
              nickName: ee.nickName,
              avatarUrl:ee.avatarUrl,
              gender:ee.gender,
              phone:ee.city,
              birthday:'2020-06-17',
              information:ee.city,
              sort:ee.city,
              work:ee.city,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
                console.log(res)
            }
        }),
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
              isHide: false
          });
          wx.navigateTo({
            url: '/pages/personal/personal',
          })
      } 
  },
  
})