// pages/my/index.js
import UserDataManager from "../../global/manager/userDataManager";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: null,
    operate: [
      {
        name: '我加入的活动',
        icon: '/resources/images/activity.png',
        url: ''
      },
      {
        name: '我加入的团队',
        icon: '/resources/images/group.png',
        url: ''
      },
      {
        name: '我发起的团队',
        icon: '/resources/images/group-2.png',
        url: '',
      },
      {
        name: '我预约的场馆',
        icon: '/resources/images/venue.png',
        url: '',
      },
      {
        name: '我的随拍',
        icon: '/resources/images/journal.png',
        url: '',
      },
      {
        name: '我的资料',
        icon: '/resources/images/info.png',
        url: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.userData = UserDataManager.queryUserData(this, function(userData){
      that.setData({
        userData
      })
    })
    this.setData({
      userData: {
        name: '社区王大爷',
        avatar: "/resources/images/logo.jpg"
      }
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
    UserDataManager.removeUserDataChangeObserver(this);
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

  /**
   * 点击申请成为召集人
   */
  tapApplyConvener: function() {
    wx.navigateTo({
      url: '/pages/convener/index',
    })
  }
})