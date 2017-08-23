//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  locManageTap: function() {
    wx.navigateTo({
      url: '../locManage/locMan/locManView'
    })
  },
  categoryTap:function() {
    wx.navigateTo({
      url: '../category/categoryView'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.navigateTo({
      url: '../locManage/locMan/locManView'
    })
    //调用应用实例的方法获取全局数据
  }
})
