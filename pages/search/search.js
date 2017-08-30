// search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: true,
    inputVal: "",
    commodities: null,
    searchHistory: []
  },
  // 下拉加载更多, 懒加载
  downloadMoreItem: function() {
    console.log('get more data')
    // 没接口暂时未写
    // Todo
  },
  //上拉刷新
  updateItem: function() {
    console.log('get more data')
    // 没接口暂时未写
    // Todo
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //反转inputShowed
  switchInputShowed:function() {
    this.data.inputShowed = !this.data.inputShowed;
    this.setData({
      inputShowed: this.data.inputShowed
    });
  },
  //点击取消按钮
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //监听输入变化
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //确认搜索内容 
  searchConfirm: function(e) {
    this.updateHistory(this.data.inputVal);
    this.switchInputShowed();
  },
  //更新本地存储历史数据
  updateHistory: function(str) {
    var that = this;
    that.data.searchHistory.push(str);
    //最多存10项
    while (that.data.searchHistory.length > 10) {
      that.data.searchHistory.shift();
    }
    that.setData({
      searchHistory: that.data.searchHistory
    })
    wx.setStorage({
      key:"searchHistory",
      data: that.data.searchHistory
    })
  },
  //设置页面上显示的history
  setHistory: function() {
    var that = this;
    wx.getStorage({
      key: 'searchHistory',
      success: function(res) {
        that.data.searchHistory = res.data;
        that.setData({
          searchHistory: that.data.searchHistory
        })
      },
      fail: function(res) {
        console.log("no search history");
      }
    })
  },

  historyItemTap: function(e) {
    var idx = e.target.dataset.idx;
    console.log(idx);
    this.data.inputVal = this.data.searchHistory[idx];
    this.setData({
      inputVal: this.data.inputVal
    });
    this.searchConfirm();
  },

  clearHistory: function() {
    console.log(1);
    var that = this;
    that.data.searchHistory = [];
    that.setData({
      searchHistory: that.data.searchHistory
    })
    wx.setStorage({
      key:"searchHistory",
      data: that.data.searchHistory
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.commodities = this.requestForItemsOfType(10);
    console.log(this.data.commodities);
    this.setData({
      commodities: this.data.commodities
    })
    this.setHistory();
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
  requestForItemsOfType: function (num) {
    var temp = {
      category: "饮料",
      imgSrc: "../../resources/商品图测试.jpg",
      title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
      realPrice: 999,
      originalPrice: 1000
    }
    var tempArr = [];
    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  }
})