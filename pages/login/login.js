import fn from '../../utils/util'

const app = getApp()

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '15021275672',
    mpid: null,
    user: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      mpid: options.mpid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindPhone(e){
    let that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({ user: res.userInfo })
        let phone = e.detail.value.phone
        
        if (!fn.verify('phone').test(phone)) {
          fn.msg('手机号码格式有误，请改正')
          return
        }

        let data = that.data.user
        data.phone = phone
        data.mpid = that.data.mpid || ''

        app.request({
          url: `${app.data.api}mini/bind-phone`,
          data
        }, true).then(function (res) {
          if (!res.state) {
            fn.msg(res.info)
            return
          }
          fn.success('用户绑定成功').then(function () {
            wx.navigateBack()
          })
        })
      },
      fail: function() {
        fn.msg('请先点击同意授权按钮并允许')
      }
    })
  },
})