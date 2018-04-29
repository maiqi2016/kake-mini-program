const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,

  verify: function(type) {
    var regBox = {
      email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      phone: /^1\d{10}$/,
    }

    return regBox[type]
  },

  msg: function(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  jsonToQuery: function(o) {
    return Object.keys(obj).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
  },

  success: function(msg, time = 2000) {
    return new Promise(function (resolve, reject) {
      wx.showToast({
        title: msg,
        mask: true,
        duration: time,
      })
      setTimeout(function () {
        resolve()
      }, time)
    })
  },

  isString: function(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  },

  parseQueryString: function(url = null, hostPart = false) {
    url = decodeURIComponent(url || location.href);
    if (url.indexOf('?') === -1) {
      if (url.indexOf('http') === 0) {
        url = url + '?';
      } else {
        url = '?' + url;
      }
    }
    let items = {};
    let urlArr = url.split('?');
    if (hostPart) {
      items['host_part'] = urlArr[0];
    }
    url = urlArr[1];
    if (url.length === 0) {
      return items;
    }
    if (url.indexOf('#')) {
      url = url.split('#')[0];
    }
    url = url.split('&');
    for (let item of url) {
      item = item.split('=');
      items[item[0]] = item[1];
    }
    return items;
  },
}
