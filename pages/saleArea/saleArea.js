// saleArea.js
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
      .concat(this.requestForItemsOfSaleAct(commodities[idx].length, 
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
   * 测试用函数 - 模仿后台传输数据项，请求活动项
   */
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

  /**
   * 测试用函数 - 模仿后台传输数据项，请求对应活动项的商品
   * @param {number} first - 请求的头一项在数据库中的索引位置 
   * @param {number} num - 请求的数据量
   * @param {string} actName - 请求商品对应的活动名
   * @return {array} 商品信息数组
   */
  requestForItemsOfSaleAct: function (first, num, actName) {
    var temp = {
      actName: "饮料",
      imgSrc: "../../resources/商品图测试.jpg",
      title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
      realPrice: 999,
      originalPrice: 1000
    }
    temp.actName = actName;
    temp.title = actName + " - 超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面"
    var tempArr = [];
    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  },
})