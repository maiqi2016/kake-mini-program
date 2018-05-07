Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,   // 全选状态，默认全选
    txtOrderCode: ''
  },

  // 购物车功能
  // 增加数量
  add(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  reduction(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  // 总价
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
<<<<<<< Updated upstream
  
  // 选择套餐事件
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
=======

  choosePackage: function(e) {
    const pid = e.currentTarget.dataset.index
    let d = this.data.d
    
    d.packageList[pid].choose = !d.packageList[pid].choose
    d.packageList[pid].number = d.packageList[pid].choose ? 1 : 0
    
    this.setData({d:d})
    this.countTotalPrice()
  },

  getCaptcha: function(e) {
    let that = this
    app.request({
      url: 'general/ajax-sms',
      data: {
        phone: that.data.d.contact.phone,
        type: 2
      }
    }, true).then(function(res) {
      if (!res.state) {
        fn.msg(res.info)
        return
      }
      fn.success(res.info)
    })
>>>>>>> Stashed changes
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({
      hasList: true,
      carts: [
        { id: 1, title: '双卧泳池别墅（11.1-12.31周末适用）', num: 1, price: 5, selected: false },
        { id: 2, title: '大床房', num: 1, price: 8, selected: false }
      ]
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

<<<<<<< Updated upstream
=======
    let data = {
      product_id: that.data.d.productId,
      'user_info[name]': that.data.d.contact.real_name,
      'user_info[phone]': that.data.d.contact.phone,
      'user_info[captcha]': that.data.d.contact.captcha,
      payment_method: 'wx'
    }

    for (let i in pk) {
      data[`package[${i}]`] = pk[i]
    }

    app.request({
      url: 'detail/prefix-payment',
      data
    }).then(function(res) {
      if (!res.state) {
        fn.msg(res.info)
        return
      }
      app.request(`https:${res.data}`).then(function(res) {
        if (!res.state) {
          fn.msg(res.info)
          return
        }
        let data = res.data.json_arr
        delete data.appId
        data.success = function(res) {
          console.log('success:', res)
        }
        data.fail = function(res) {
          console.log('fail:', res)
        }
        wx.requestPayment(data)
      })
    })
>>>>>>> Stashed changes
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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