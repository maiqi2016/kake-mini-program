
import fn from '../../utils/util.js'

let app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,

    // 默认tab栏选中酒店
    currentTab: 0,
    position: "static",
    top: null,

    list: {}
  },
  
  //切换背景样式
  className: function (e) {
    let tab = e.currentTarget.dataset.tab
    this.setData({
      "currentTab": tab
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let si = setInterval(function() {
      if (app.data.user) {
        app.request(`distribution/items&channel=${app.data.channel}`).then(function (res) {
          for (let i of res.data.focusList) {
            i.link_url = fn.parseQueryString(i.link_url)
          }
          that.setData({list: res.data})
        })
        clearInterval(si)
      }
    }, 50)
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
  /**
   * 页面滚动固定tab栏事件
   */
  onPageScroll: function (e) {
    var that = this;
    if (e.scrollTop >= 261) {
      that.setData({
        "position": "fixed",
        "top": "0"
      });
    } else {
      that.setData({
        "position": "static"
      });
    }
  }
})
