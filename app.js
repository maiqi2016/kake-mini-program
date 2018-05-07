import fn from './utils/util'

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    options.query.channel && (this.data.channel = options.query.channel)
    this.setProxy()

    let that = this
    that.request('mini/init-session').then(function(res) {
      // set session id
      wx.setStorageSync('session_id', res.data.session_id)
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          that.request({
            url: 'mini/login',
            data: {
              code: res.code
            }
          }).then(function (res) {
            if (!res.state) {
              wx.navigateTo({ url: `../../pages/login/login?mpid=${res.info}` })
            }
            wx.setStorageSync('user', res.data)
          })
        }
      })
    })
  },

  setProxy: function () {
    this.data = new Proxy(this.data, {
      get: function (target, key, receiver) {
        if (target[key]) {
          return Reflect.get(target, key, receiver);
        }

        let val = wx.getStorageSync(key) || null
        Reflect.get(target, key, val, receiver)

        return val
      },
    });
  },

  request: function (options, post = false) {
    
    let that = this
    return new Promise(function(resolve, reject) {

      if (fn.isString(options)) {
        options = {
          url: options
        }
      }

      delete options.success
      delete options.fail

      let method = post ? 'POST' : 'GET'

      let auto = {
        method,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          resolve(res.data)
        },
        fail: function(res) {
          reject(res)
        }
      }

      if (that.data.session_id) {
        auto.header.Cookie = `KK_SESS=${that.data.session_id}`
      }

      options = Object.assign(auto, options)
<<<<<<< Updated upstream
      options.url = `${that.data.api}${options.url}&mini-program=1`
=======

      if (options.url.indexOf('https://') === -1) {
        options.url = `${that.data.api}${options.url}`
      }
>>>>>>> Stashed changes

      wx.request(options)
    })
  },

  data: {
    api: "https://www.kakehotels.com/?r=",
    channel: 'nubXnej7'
  }
})