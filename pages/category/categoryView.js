/**
 * categoryView.js - 分类页面
 */

var fakeData = require('../../common/fakeData.js')

Page(
  {
  data: {
    categories: ['全部'],
    currentTab: 0,
    scrollLeftValue: 0,
    isPickerShow: false,
    isBgNeed: false,
    commodities: []
  },

  navbarTap: function (e) {
    //将顶部导航栏自动移动到合适的位置
    var idx = e.currentTarget.dataset.idx;
    this.autoScrollTopNav(idx);

    //自动收回
    if (this.data.isPickerShow) {
      this.navbarBtnClick();
    }

    this.setData({
      currentTab: idx
    })
  },


  /**
   * 导航栏右侧箭头按钮点击事件 - 切换模糊背景开闭状态以及展开栏开闭状态
   */
  navbarBtnClick: function(e) {
    this.data.isBgNeed = !this.data.isPickerShow
    this.setData({
        isBgNeed: this.data.isBgNeed
    })

    this.data.isPickerShow = !this.data.isPickerShow
    this.setData({
      isPickerShow: this.data.isPickerShow,
    })
  },

  /**
   * 页面左右滑动事件 - 构造滑动动画，若当前页面无数据，自动加载，需要完善加载函数
   */
  swiperChange: function (e) {
    var idx = e.detail.current;
    this.autoScrollTopNav(idx);

    this.setData({
      currentTab: e.detail.current,
    })

    //若无数据，自动加载
    if (this.data.commodities[idx].length == 0) {
      this.downloadMoreItem();
    }
  },

  /**
   * 上拉刷新
   */
  updateItem: function(e) {
    var idx = this.data.currentTab;
    this.data.commodities[idx] = [];
    this.downloadMoreItem();
  },

  /**
   * 下载更多数据 - 涉及后台拉取数据，需完善
   */
  downloadMoreItem: function(e) {
    var idx = this.data.currentTab;
    var commodities = this.data.commodities;

    //获取更多数据
    commodities[idx] = commodities[idx].concat(
      fakeData.requestForItemsOfType(commodities[idx].length, 10, this.data.categories[idx])
      );

    this.setData({
      commodities: this.data.commodities
    })

    console.log(this.data.commodities);
  },

  /**
   * 用于自动调整顶部类别滑动栏滑动距离，使滑动到用户可接受的合适位置，但自适应上还未考虑太周到
   * @param {number} idx - The index of currentTap.
   */
  autoScrollTopNav: function (idx) {
    if (idx <= 2) {
      this.data.scrollLeftValue = 0;
    } else {
      this.data.scrollLeftValue = (idx - 2) * 60;
    }
    this.setData({
      scrollLeftValue: this.data.scrollLeftValue
    })
  },

  /**
   * 模糊背景点击事件 - 点击模糊背景取消选择
   */
  bgTap: function(e) {
    if (this.data.isPickerShow) {
      this.navbarBtnClick();
    } else {
       return;
    }
  },

  /**
   * 商品点击事件 - 待完善
   */
  itemTap: function(e) {
    console.log("you selsct type " + this.data.currentTab + " item " + e.currentTarget.dataset.idx);
  },

  /**
   * 生命周期函数--监听页面加载，在加载的时候抓取数据
   */
  onLoad: function (options) {
    //首先获取类别项
    this.data.categories = fakeData.requestForCategories();
    this.setData({
      categories: this.data.categories
    })
    //然后默认请求 全部 分类
    for (var i in this.data.categories) {
      this.data.commodities.push([]);
    }
    this.data.commodities[0] = fakeData.requestForItemsOfType(0, 10);
    console.log(this.data.commodities);
    this.setData({
      commodities: this.data.commodities
    })
  }
})