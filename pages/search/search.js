// search.js
var fakeData = require('../../common/fakeData.js');

Page({
  data: {
    inputShowed: true,
    inputVal: "",
    commodities: null,
    searchHistory: []
  },

  /**
   * 下拉加载更多, 懒加载，没接口暂时未写
   */
  downloadMoreItem: function() {
    console.log('get more data')
    // Todo
  },

  
  /**
   * 上拉刷新，没接口暂时未写
   */
  updateItem: function() {
    console.log('get more data')
    // Todo
  },

  /**
   * 搜索栏控制函数 - 搜索框输入状态
   */
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  /**
   * 搜索栏控制函数 - 搜索框变成非输入状态，同时清空搜索框
   */
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  /**
   * 搜索栏控制函数 - 反转inputShowed
   */
  switchInputShowed:function() {
    this.data.inputShowed = !this.data.inputShowed;
    this.setData({
      inputShowed: this.data.inputShowed
    });
  },

  /**
   * 搜索栏控制函数 - 清空搜索框内容
   */
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 搜索确认 - 更新历史记录，请求后台数据（待完善）
   */
  searchConfirm: function(e) {
    if (this.data.inputVal === '') return
    this.addOneDataToHistory(this.data.inputVal)
    this.updateHistory();
    this.switchInputShowed();
    //Todo - 获取后台数据
    this.data.commodities = fakeData.requestForItemsOfSearch(10, this.data.inputVal);
    console.log(this.data.commodities);
    this.setData({
      commodities: this.data.commodities
    })
  },

  /**
   * 增加一个搜索历史到历史记录
   * 特性：检查重复，最多存10项
   * param {string} str - 需添加的历史记录
   */
  addOneDataToHistory: function(str) {
    //检查重复
    for (var i in this.data.searchHistory) {
      if (this.data.searchHistory[i] === str) {
        this.data.searchHistory.splice(i, 1);
        break;
      }
    }
    this.data.searchHistory = [str].concat(this.data.searchHistory);
    //最多存10项
    while (this.data.searchHistory.length > 10) {
      this.data.searchHistory.shift();
    }
  },

  /**
   * 更新本地存储历史数据
   * param {string} str - 需添加的历史记录
   */
  updateHistory: function() {
    var that = this;
    that.setData({
      searchHistory: that.data.searchHistory
    });
    wx.setStorage({
      key:"searchHistory",
      data: that.data.searchHistory
    });
  },

  /**
   * 获取用户本地历史记录
   */
  getLocalHistory: function() {
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

  /**
   * 直接点击历史记录查询
   */
  historyItemTap: function(e) {
    var idx = e.target.dataset.idx;
    this.data.inputVal = this.data.searchHistory[idx];
    this.setData({
      inputVal: this.data.inputVal
    });
    this.searchConfirm();
  },

  /**
   * 清空历史记录
   */
  clearHistory: function() {
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
    this.getLocalHistory();
  }
})