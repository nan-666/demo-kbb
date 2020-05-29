//app.js
/**
 * 实现小程序的登录，流程如下：
 * 1. 先判断用户是否已登录，即缓存中是否已经有token。
 * 2. 如果缓存中有token则无需再登录（调用wx.login())，但是需要校验token有效性。因为token可能会因为多终端登录等原因过期，
 *    如token过期则需要让用户重新登录（调用wx.login())；如果token有效，则后续的业务操作都要携带token。
 * 3. 如果缓存中没有token，用户需要进行登录，登录时分为两种情况：
 *    （1）用户已存在：在服务端根据用户发送的code生成唯一的openId，并且在数据库中查询到此openId，说明此用户已存在：
 *        a）生成新的token，并更新数据库中旧token；
 *        b）把新token发回小程序端，更新缓存。
 *     (2) 用户不存在：在数据库中没有查询到用户的openId，说明此用户不存在：
 *        a）在服务端的数据库表user中，首先新添加一个用户，同时可以设置一些默认数据（比如默认用户名、初始积分等）；
 *        b）生成token，把openId、token以及新用户的userId存入数据库表session中；
 *        c）把token返回到小程序端缓存。
 * 注意：为了后期更新token方便，同时数据库中数值型查询效率比字符型查询效率高（token、openId都为字符型），各数据表中不要、
 *      直接存token或openId字段，而是将token、openId与userId关联。
 */
App({

  // 打开小程序最先执行此函数，实际开发中常用来做登录判断、存储/更新缓存等
  onLaunch: function () {
    var _this = this;
    // 验证登录：取出缓存中token
    var token = wx.getStorageSync('token');
    if (token) { // 已有token
      _this.checkLogin(token)
    } else {
      this.login();
    }

    // 判断用户已授权项，根据授权项来依次获取用户信息等
    wx.getSetting({
      success: (res) => {
        console.log('wx.getSetting')
        // authSetting：保存用户的授权结果的数组， 返回值为true或false
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              this.gobalData.userInfo = res.userInfo;
              if(this.getUserInfoCallback){
                this.getUserInfoCallback(res)
              }
            }
          })
        }
      },
    })

  },

  // 校验token有效性
  checkLogin: function (token) {
    var _this = this;
    wx.request({
      url: 'http://127.0.0.1:8080/kbb/main/java/login/CheckLogin',
      method: 'POST',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        if(res.data.success){        // token有效，存为全局变量
          _this.gobalData.token = token;
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
          url: 'http://localhost:8080/kbb/main/java/login/Login',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data.token)
            // 将token保存为全局变量，共各页面使用
            _this.gobalData.token = res.data.data.token;
            // 将token存入缓存，下次打开小程序无需再登录获取token
            wx.setStorage({
              data: res.data.data.token,
              key: 'token'
            })
          }
        })
      },
    })
  },

  // 全局变量定义
  gobalData: {
    token: '',
    userInfo: null
  }
})