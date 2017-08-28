// discountCounpon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponTypes: ['未使用', '使用记录', '已过期'],
    currentTab:0,
    couponItems: [
      {
        couponPrice: 10,
        couponTitle: "虐狗必备优惠券",
        couponCondition: "满199使用",
        couponTimeStampStart: "2017-10-10",
        couponTimeStampEnd: "2018-10-10",
        couponStatus: 0
      },
      {
        couponPrice: 10,
        couponTitle: "虐狗必备优惠券",
        couponCondition: "满199使用",
        couponTimeStampStart: "2017-10-10",
        couponTimeStampEnd: "2018-10-10",
        couponStatus: 0
      }
    ]
  },

  swiperChange: function(e) {
    var idx = e.detail.current;

    this.setData({
      currentTab: e.detail.current,
    })

    //若无数据，加载
    // if (this.data.commodities[idx].length == 0) {
    //   this.downloadMoreItem();
    // }
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