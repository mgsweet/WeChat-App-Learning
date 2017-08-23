//locManView.js
Page({
	data: {
    addLocImageSrc: "../../../resources/新建地址.png",
    editImageSrc: "../../../resources/编辑.png",
    deleteImageSrc: "../../../resources/删除.png",
		noLoc: {
			image: '../../../resources/空地址.png',
			warnText: '你还没有新建地址',
			mode: 'scaleToFill'
		},
    userLocInfo: [
    ],
	},
  max_id: -1,

	addLocBtnTap: function() {
    this.max_id++;
    wx.setStorage({
      key: 'UserLocInfo_maxId',
      data: this.max_id,
    })

    var urlStr = '../addLoc/addLocView?id=' + this.max_id;
    wx.redirectTo({
      url: urlStr
    })
  },

  editLocBtnClick: function(e) {
    var x = -1;
    for (var i in this.data.userLocInfo) {
      if (this.data.userLocInfo[i].id == e.target.dataset.id) {
        x = i;
        break;
      }
    }

    if (x == -1) {
      console.log("can't find edit project");
      return;
    }

    const seleteLoc = this.data.userLocInfo[x]

    var urlStr = '../addLoc/addLocView?id=' + seleteLoc.id + 
      '&name=' + seleteLoc.name + '&num=' + seleteLoc.num + 
      '&address=' + seleteLoc.address + '&region0=' + seleteLoc.region[0] + 
      '&region1=' + seleteLoc.region[1] + '&region2=' + seleteLoc.region[2] + 
      '&isDefault=' + seleteLoc.isDefault;

    wx.redirectTo({
      url: urlStr
    })
  },

  deleteLocBtnClick: function(e) {
    var that = this;

    function deleteLoc(id) {
      if (that.data.userLocInfo.length == 0) return;
      //search the index of that id, if cant find, return
      var x = -1;
      for (var i in that.data.userLocInfo) {
        if (that.data.userLocInfo[i].id == id) {
          x = i;
          break;
        }
      }
      if(x == -1) return;
      //record whether the delete item is default address
      var isDefault = that.data.userLocInfo[x].isDefault;

      that.data.userLocInfo.splice(x, 1);

      if (that.data.userLocInfo.length > 0) { 
        if (isDefault == true) {
          that.data.userLocInfo[0].isDefault = true;
        }
      }
      
      wx.setStorage({
        key: 'UserLocInfo',
        data: that.data.userLocInfo,
      })
      that.setData({
        userLocInfo: that.data.userLocInfo
      })
    }

    wx.showModal({
      title: '温馨提示',
      content: '确定要删除这个地址吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('删除地址' + e.target.dataset.id)
          deleteLoc(e.target.dataset.id);
          console.log(that.data.userLocInfo)
        }
      }
    })
  },

  //设置默认地址
  setDefaultLoc: function(e) {
    //找到原来的默认
    var x;
    var y;

    for (var i in this.data.userLocInfo) {
      if (this.data.userLocInfo[i].isDefault == true) {
        x = this.data.userLocInfo[i];
      }
      if (this.data.userLocInfo[i].id == e.target.dataset.id) {
        y = this.data.userLocInfo[i]
      }
    }

    if (x == y) return;

    x.isDefault = false;
    x.id = e.target.dataset.id;
    y.isDefault = true;
    y.id = 0;

    this.setData({
      userLocInfo: this.data.userLocInfo
    })

    wx.setStorage({
      key: 'UserLocInfo',
      data: this.data.userLocInfo,
    })

    console.log(this.data.userLocInfo)

    //todo
    //改变本地数据和后台数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
          data: -1,
        })
      }
    })
    wx.getStorage({
      key: 'UserLocInfo',
      success: function (res) {
        console.log(res.data)
        that.data.userLocInfo = res.data;
        that.setData({
          userLocInfo: that.data.userLocInfo
        })
      },
      fail: function (e) {
        console.log("no address info");
      }
    })
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
    function letDefaultBeFront() {
      var defaultPos = -1;
      for (var i in that.data.userLocInfo) {
        if (that.data.userLocInfo[i].isDefault == true) {
          defaultPos = i;
          break;
        }
      }
      console.log("当前默认地址位置= " + defaultPos);
      if (defaultPos) {
        var tempArr = that.data.userLocInfo.splice(defaultPos, 1)
        //console.log(tempArr)
        that.data.userLocInfo = tempArr.concat(that.data.userLocInfo);
        //console.log(that.data.userLocInfo);
        that.setData({
          userLocInfo: that.data.userLocInfo
        })
        wx.setStorage({
          key: 'UserLocInfo',
          data: that.data.userLocInfo,
        })
      }
    }
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