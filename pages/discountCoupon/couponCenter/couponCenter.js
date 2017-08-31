// couponCenter.js
var fakeData = require('../../../common/fakeData.js')

Page({
  data: {
    coupons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAvailableCoupons();
  },
 
  /**
   * 测试用函数
   */
  getAvailableCoupons: function() {
    //couponStatus 0: 立即使用, 1: 点击领取, 2:已使用, 3:已过期
    this.data.coupons = fakeData.requestForCouponOfStatus(1);
    this.setData({
      coupons: this.data.coupons
    })
  }
})