// discountCounpon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //couponStatus 0: 立即使用, 1: 点击领取, 2:已使用, 3:已过期
    couponTypes: ['未使用', '使用记录', '已过期'],
    currentTab:0,
    couponItems: [[], [], []]
  },
  //测试用函数
  getNotUsedCoupon: function() {
    this.data.couponItems[0] = this.requestForItemsOfType(0);
    this.setData({
      couponItems: this.data.couponItems
    })
  },

  swiperChange: function(e) {
    var idx = e.detail.current;

    this.setData({
      currentTab: e.detail.current,
    })
  },

  navbarTap: function(e) {
    var idx = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotUsedCoupon();
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
  //请求对应分类的商品
  requestForItemsOfType: function (itemType) {
    var temp = {
      couponPrice: 10,
      couponTitle: "虐狗必备优惠券",
      couponCondition: "满199使用",
      couponTimeStampStart: "2017-10-10",
      couponTimeStampEnd: "2018-10-10",
      couponStatus: 0
    }
    temp.couponStatus = itemType;
    var tempArr = [];
    for (var i = 0; i < 10; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  } 
  
})













