import fn from '../../utils/util'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 1,
    circular: true,
    char_lt: "<",
    char_rt: ">",
    // 详情和预订须知
    currentTab:"detail",
    // 返回顶部
    display:"none",

    detail: {}
  },

  changeCurrent: function (e) {
    this.setData({
      current: e.detail.current+1
    })
  },

  // 切换内容和样式
  className:function(e){
    this.setData({
      "currentTab": e.currentTarget.dataset.tab
    });
  },

  /**
   * 页面滚动固定tab栏事件
   */
  onPageScroll: function (e) {
    let that = this;
    if (e.scrollTop >= 150) {
      that.setData({
        "display": "block"
      });
    } else {
      that.setData({
        "display": "none"
      });
    }
  },

  //返回顶部
  goTo:function(){
    wx.pageScrollTo({
      scrollTop:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.request(`detail/index&id=${options.id}`).then(function(res) {
      that.setData({
        detail: res.data.detail
      })
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
    
  }
})