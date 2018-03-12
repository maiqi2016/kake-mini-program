Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/0077-1778-59cef7cdbe1af.jpg',
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/0117-1679-59cef7f5a5de4.jpg',
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/0083-0773-59cef7d3bcd58.jpg',
      'http://kake-file.oss-cn-shanghai.aliyuncs.com/0088-1800-59cef7d8022f0.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 1,
    circular: true,
    char_lt: "<",
    char_rt: ">",
    // 详情和预订须知
    "currentTab":"detail",
    // 返回顶部
    "display":"none",
  },

  changeCurrent: function (e) {
    this.setData({
      current: e.detail.current+1
    })
  },

  // 跳转页面
  changePage:function(){
    wx.navigateTo({
      url: '../choose-package/choose-package'
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
      var that = this;
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
    if(wx.pageScrollTo){
      wx.pageScrollTo({
        scrollTop:0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
    
  }
})