// addLocView.js
Page({
  data: {
    locInfo : {
    },
    hasErr: false
  },

  /**
   * 用于记录用户地址的最大id数，只会自增，相当于地址的key
   */
  max_id: -1,

  /**
   * 更新最大id的值，只增不减
   */
  updateMaxId: function() {
    var that = this;
    wx.getStorage({
      key: 'UserLocInfo_maxId',
      success: function(res) {
        console.log("max_id is " + res.data);
        that.max_id = res.data;
      },
      fail: function(e) {
        console.log("init address max_id")
        wx.setStorage({
          key: 'UserLocInfo_maxId',
          data: 0,
        })
        that.max_id = 0;
      }
    })
  },

  /**
   * 最大id增加1
   */
  addLocMaxID: function() {
    this.max_id++;
    wx.setStorage({
      key: 'UserLocInfo_maxId',
      data: this.max_id,
    })
  },

  bindRegionChange: function (e) {
    this.data.locInfo.region = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindNameChange: function(e) {
    this.data.locInfo.name = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindNumChange: function(e) {
    this.data.locInfo.num = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindAddressChange: function (e) {
    this.data.locInfo.address = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  
  /**
   * 判断输入是否为空，往后可加入更多判断，为空给出提示
   */
  checkData: function() {
    if (this.data.locInfo.name == "" || this.data.locInfo.num == "" || this.data.locInfo.address == "") {
      this.data.hasErr = true;
      this.setData({
        hasErr: this.data.hasErr
      })
      return false;
    }
    return true;
  },

  /**
   * 更新用户地址信息数组函数
   * param {array} userLocInfo - 原数组
   * param {locInfo} newLoc - 新的地址信息
   */
  updateInfoArr: function(userLocInfo, newLoc) {
      console.log(newLoc)
      //判断是更新还是增加
      var checkPos = -1;
      for (var i in userLocInfo) {
        if (userLocInfo[i].id == newLoc.id) {
          checkPos = i;
        }
      }
      if (newLoc.id == -1) {
        console.log("add a new loc");

        newLoc.id = this.max_id;
        this.addLocMaxID();
        //如果只有一个设置为默认地址
        if (userLocInfo.length == 0) newLoc.isDefault = true;

        userLocInfo.push(newLoc);
      } else {
        console.log("update a old loc")
        userLocInfo.splice(checkPos, 1, newLoc);
      }

      wx.setStorage({
        key: 'UserLocInfo',
        data: userLocInfo,
        success: function() {
          //更新旧页面
          var pages = getCurrentPages();
          var prePage = pages[pages.length - 2];
          prePage.getLocInfo();

          wx.navigateBack ({
            url: '../locMan/locManView',
          })
        }
      })
  },

  saveLocBtnTap: function() {
    if (this.checkData() == false) return;

    var newLoc = this.data.locInfo;

    var that = this;

    wx.getStorage({
      key: "UserLocInfo",
      //这里确保数据完成存储再跳转页面
      success: function(res) {
        var userLocInfo = res.data;
        that.updateInfoArr(userLocInfo, newLoc);
      },
      fail: function(e) {
        that.updateInfoArr([], newLoc);
        console.log(e.errMsg);
        console.log("初始化数据")
      }
    })
    //Todo
    //更新后端数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.locInfo = {
        id: options.id,
        num: options.num || "",
        name: options.name || "",
        region: [options.region0 || '北京市', options.region1 || '北京市', options.region2 || '东城区'],
        address: options.address,
        isDefault: (options.isDefault ? options.isDefault == "true" : false) 
    }

    this.updateMaxId();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      locInfo: this.data.locInfo
    })
  }
})