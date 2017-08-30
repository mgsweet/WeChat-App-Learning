//locManView.js
Page({
	data: {
    addLocImageSrc: "../../../resources/新建地址.png",
		noLoc: {
			image: '../../../resources/空地址.png',
			warnText: '你还没有新建地址',
			mode: 'scaleToFill'
		},
    userLocInfo: [
    ],
	},

  getLocInfo: function() {
    var that = this;
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

	addLocBtnTap: function() {
    var urlStr = '../addLoc/addLocView?id=' + "-1";
    wx.navigateTo({
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

    wx.navigateTo({
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

  /***
   * 设置默认地址
   */
  setDefaultLoc: function(e) {
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
    this.getLocInfo();
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
  }
})