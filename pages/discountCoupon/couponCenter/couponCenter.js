// couponCenter.js
Page({

  /**
   * 页面的初始数据
   */
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
    this.data.coupons = this.requestForItemsOfType(1);
    this.setData({
      coupons: this.data.coupons
    })
  },

  /**
   * 模拟向后台请求对应分类的商品
   * param {number} itemStatus - 0: 立即使用, 1: 点击领取, 2:已使用, 3:已过期
   */
  requestForItemsOfType: function (itemStatus) {
    var temp = {
      couponPrice: 10,
      couponTitle: "虐狗必备优惠券",
      couponCondition: "满199使用",
      couponTimeStampStart: "2017-10-10",
      couponTimeStampEnd: "2018-10-10",
      couponStatus: 0
    }
    temp.couponStatus = itemStatus;
    var tempArr = [];
    for (var i = 0; i < 10; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  } 
})