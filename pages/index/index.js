
import utils from '../../utils/util.js'

utils.msg('hello amy');

Page({
  data: {
    // 轮播图相关数据
    imgUrls: [
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/0970-0607-5a138dfa94513.jpg',
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/1219-1713-5a138ef3ae1de.jpg',
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/1527-1893-59fbe1a7da105.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,

    // 默认tab栏选中酒店
    "currentTab": "hotel",
    "position": "static",
    "top": null
  },
  //请求数据 
  // getdata: function () {
  //     var that = this;
  //     wx.request({
  //       url: 'https://www.kakehotels.com',
  //       data: {

  //       },
  //       header: {
  //         "Content-Type": "applciation/json"
  //       },
  //       method: "GET",
  //       success: function (res) {
  //         console.log(res);
  //         that.setData({
  //           imgUrls: res.data.result
  //         })
  //       },
  //       fail: function (err) { 
  //         console.log(err);
  //       },
  //       complete: function () { }
  //     })
  //   },

  //切换背景样式
  className: function (e) {
    this.setData({
      "currentTab": e.currentTarget.dataset.tab
    });
  },
  // 跳转页面
  changePage: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
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
    if (e.scrollTop >= 250) {
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
