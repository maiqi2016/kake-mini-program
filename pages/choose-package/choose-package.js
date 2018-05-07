import fn from '../../utils/util'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    d: {},
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.request(`detail/choose-package&id=${options.id}`).then(function (res) {
      if (!res.state) {
        fn.msg(res.info)
        return
      }
      that.setData({ d: res.data })
    })
  },

  add(e) {
    const pid = e.currentTarget.dataset.index;
    let d = this.data.d

    if (d.packageList[pid].number + 1 > d.packageList[pid].min_purchase_limit) {
      fn.msg(`当前套餐最多购买${d.packageList[pid].min_purchase_limit}份`)
      return
    }
    d.packageList[pid].number += 1

    this.setData({ d: d })
    this.countTotalPrice()
  },

  reduction(e) {
    const pid = e.currentTarget.dataset.index;
    let d = this.data.d

    d.packageList[pid].number -= 1
    if (d.packageList[pid].number <= 0) {
      d.packageList[pid].choose = false
    }

    this.setData({ d: d })
    this.countTotalPrice()
  },

  countTotalPrice() {
    let d = this.data.d
    let total = 0

    for (let i in d.packageList) {
      total += d.packageList[i].min_price * (d.packageList[i].number || 0)
    }

    this.setData({ totalPrice: total })
  },

  choosePackage: function (e) {
    const pid = e.currentTarget.dataset.index
    let d = this.data.d

    d.packageList[pid].choose = !d.packageList[pid].choose
    d.packageList[pid].number = d.packageList[pid].choose ? 1 : 0

    this.setData({ d: d })
    this.countTotalPrice()
  },

  getCaptcha: function (e) {
    let that = this
    app.request({
      url: 'general/ajax-sms',
      data: {
        phone: that.data.d.contact.phone,
        type: 2
      }
    }, true).then(function (res) {
      if (!res.state) {
        fn.msg(res.info)
        return
      }
      fn.success(res.info)
    })
  },

  changeContact: function (e) {
    let d = this.data.d
    d.contact[e.currentTarget.dataset.name] = e.detail.value
    this.setData({ d: d })
  },

  payment: function () {
    let pk = {}
    let that = this
    for (let i in that.data.d.packageList) {
      let v = that.data.d.packageList[i]
      if (v.number > 0 && v.choose) {
        pk[i] = v.number
      }
    }

    if (JSON.stringify(pk) === '{}') {
      fn.msg('请选择要购买的套餐')
      return
    }

    if (!that.data.d.contact.real_name) {
      fn.msg('请输入联系人名称')
      return
    }

    if (!that.data.d.contact.phone) {
      fn.msg('请输入联系人手机号码')
      return
    }

    if (!that.data.d.contact.captcha || that.data.d.contact.captcha.length !== 4) {
      fn.msg('请输入短信验证码(4位)')
      return
    }

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
    }).then(function (res) {
      if (!res.state) {
        fn.msg(res.info)
        return
      }
      app.request(`https:${res.data}`).then(function (res) {
        if (!res.state) {
          fn.msg(res.info)
          return
        }
        let data = res.data.json_arr
        delete data.appId
        data.success = function (res) {
          console.log('success:', res)
        }
        data.fail = function (res) {
          console.log('fail:', res)
        }
        wx.requestPayment(data)
      })
    })
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