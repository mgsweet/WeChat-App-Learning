// categoryView.js
Page({
  data: {
    categories: ['全部', '分类一', '分大类一', '分类三', '分类四', '分类五', '分类三', '分类四', '分类五', '分类三', '分类四', '分类五'],
    currentTab: 0,
    scrollLeftValue: 0,
    isPickerShow: false,
    isBgNeed: false,
    commodities: [
      {
        category: "分类三",
        imgSrc: "../../resources/商品图测试.jpg",
        title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
        price: 999
      },
      {
        category: "分类三",
        imgSrc: "../../resources/商品图测试.jpg",
        title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
        price: 999
      },
      {
        category: "分类三",
        imgSrc: "../../resources/商品图测试.jpg",
        title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
        price: 999
      },
      {
        category: "分类三",
        imgSrc: "../../resources/商品图测试.jpg",
        title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
        price: 999
      },
      {
        category: "分类一",
        imgSrc: "../../resources/商品图测试.jpg",
        title: "超级无敌平靓正师奶抢购食神推介无敌澎湃鱼蛋车仔面",
        price: 999
      }
    ]
  },
  navbarTap: function (e) {
    //auto scroll
    var idx = e.currentTarget.dataset.idx;
    if (idx > 2 || idx < this.data.navbar.length - 2) {
      this.data.scrollLeftValue = (idx - 2) * 60;
      this.setData({
        scrollLeftValue: this.data.scrollLeftValue
      })
    }

    if (this.data.isPickerShow) {
      this.navbarBtnClick();
    }

    this.setData({
      currentTab: idx
    })
  },
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
  swiperChange: function (e) {    
    console.log(e)
    this.setData({  
      currentTab: e.detail.current,  
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
    console.log("haha");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
      },
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