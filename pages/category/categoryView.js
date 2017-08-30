// categoryView.js
Page({
  data: {
    categories: ['全部'],
    currentTab: 0,
    scrollLeftValue: 0,
    isPickerShow: false,
    isBgNeed: false,
    commodities: []
  },

  navbarTap: function (e) {
    //auto scroll
    var idx = e.currentTarget.dataset.idx;

    //自动移动导航栏滑动的位置
    this.autoScrollTopNav(idx);

    if (this.data.isPickerShow) {
      this.navbarBtnClick();
    }
    this.setData({
      currentTab: idx
    })
  },

  //导航栏右侧按钮点击
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

  //左右滑动改变
  swiperChange: function (e) {
    var idx = e.detail.current;
    this.autoScrollTopNav(idx);

    this.setData({
      currentTab: e.detail.current,
    })

    //若无数据，加载
    if (this.data.commodities[idx].length == 0) {
      this.downloadMoreItem();
    }
  },

  //上拉更新
  updateItem: function(e) {
    var idx = this.data.currentTab;
    this.data.commodities[idx] = [];
    this.downloadMoreItem();
  },

  //下拉刷新
  downloadMoreItem: function(e) {
    var idx = this.data.currentTab;
    this.data.commodities[idx] = this.data.commodities[idx]
      .concat(this.requestForItemsOfType(this.data.commodities[idx].length, 10, this.data.categories[idx]));
    this.setData({
      commodities: this.data.commodities
    })
    console.log(this.data.commodities);
  },

  //用于自动调整顶部左右滑动栏滑动距离
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

  bgTap: function(e) {
    if (this.data.isPickerShow) {
      this.navbarBtnClick();
    } else {
       return;
    }
  },

  itemTap: function(e) {
    console.log("you selsct type " + this.data.currentTab + " item " + e.currentTarget.dataset.idx);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先获取类别项
    this.data.categories = this.requestForCategories();
    this.setData({
      categories: this.data.categories
    })
    //然后默认请求 全部 分类
    for (var i in this.data.categories) {
      this.data.commodities.push([]);
    }
    this.data.commodities[0] = this.requestForItemsOfType(0, 10);
    console.log(this.data.commodities);
    this.setData({
      commodities: this.data.commodities
    })
  },

  //模仿后台传输数据项
  //请求分类项
  requestForCategories: function() {
    var data = ['全部', '女装', '男装', '食品', '情趣用品', '饮料', '睡衣'];
    return data;
  },

  //请求对应分类的商品
  requestForItemsOfType: function (first, num, itemType = '全部') {
    var temp = {
      category: "饮料",
      imgSrc: "../../resources/商品图测试.jpg",
      title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
      realPrice: 999,
      originalPrice: 1000
    }
    temp.category = itemType;
    temp.title = itemType + " - 超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面"
    var tempArr = [];
    for (var i = 0; i < num; i++) {
      tempArr.push(temp);
    }
    return tempArr;
  } 
  

})