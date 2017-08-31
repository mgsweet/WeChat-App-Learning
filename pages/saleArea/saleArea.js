// saleArea.js
var fakeData = require('../../common/fakeData.js');

Page({
  data: {
    saleActs: [],
    commodities:[],
    currentTab: 0
  },

  /**
   * 从后台下载数据 - 请求当前选择活动的商品
   */
  downloadMoreItem: function() {
    var idx = this.data.currentTab;
    var commodities = this.data.commodities;

    commodities[idx] = commodities[idx]
      .concat(fakeData.requestForItemsOfSaleAct(commodities[idx].length, 
        10, this.data.saleActs[idx].actName));

    this.setData({
      commodities: this.data.commodities
    })
    console.log(commodities);
  },

  /**
   * 下拉刷新，从后台下载最新数据
   */
  updateItem: function() {
    var idx = this.data.currentTab;
    this.data.commodities[idx] = [];
    this.downloadMoreItem();
  },

  /**
   * 左右滑动事件函数
   */
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
    this.data.saleActs = fakeData.requestForSaleActs();
    for (var i in this.data.saleActs) {
      this.data.commodities.push([]);
    }
    this.data.commodities[0] = fakeData.requestForItemsOfSaleAct(0, 10, this.data.saleActs[0].actName);
    console.log(this.data.commodities);
    this.setData({
      saleActs: this.data.saleActs,
      commodities: this.data.commodities
    })
  },
})