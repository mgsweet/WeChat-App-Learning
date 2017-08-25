// saleArea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleActs: [],
    commodities:[],
    currentTab: 0
  },

  downloadMoreItem: function(e) {
    var idx = this.data.currentTab;
    console.log(idx);
    this.data.commodities[idx] = this.data.commodities[idx]
      .concat(this.requestForItemsOfSaleAct(this.data.commodities[idx].length, 10, this.data.saleActs[idx].actName));
    this.setData({
      commodities: this.data.commodities
    })
    console.log(this.data.commodities);
  },

  updateItem: function(e) {
    var idx = this.data.currentTab;
    this.data.commodities[idx] = [];
    this.downloadMoreItem();
  },

  swiperChange: function(e) {
    var idx = e.detail.current;
    this.data.currentTab = idx;
    this.setData({
      currentTab: this.data.currentTab
    })
    if (this.data.commodities[idx].length == 0) {
      this.downloadMoreItem();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.saleActs = this.requestForSaleActs();
    for (var i in this.data.saleActs) {
      this.data.commodities.push([]);
    }
    this.data.commodities[0] = this.requestForItemsOfSaleAct(0, 10, this.data.saleActs[0].actName);
    console.log(this.data.commodities);
    this.setData({
      saleActs: this.data.saleActs,
      commodities: this.data.commodities
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
    this.updateItem();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.downloadMoreItem();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //模仿后台传输数据项
  //请求分类项
  requestForSaleActs: function() {
    var data = [];
    for (var i = 0; i < 3; i++) {
      data.push({
        actName: "优惠" + i,
        actImgSrc: "../../resources/商品图测试.jpg"
      });
    }
    return data;
  },

  //请求对应分类的商品
  requestForItemsOfSaleAct: function (first, num, itemType) {
    var temp = {
      actName: "饮料",
      imgSrc: "../../resources/商品图测试.jpg",
      title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
      realPrice: 999,
      originalPrice: 1000
    }
    temp.actName = itemType;
    temp.title = itemType + " - 超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面"
    var tempArr = [];
    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  },
})