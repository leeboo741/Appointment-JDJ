const { checkEmpty } = require("../../../utils/util");

// pages/venues/venues-appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venues: null, // 场馆
    submitData: {
      activityIdName: "", // 活动名称名称
      activityCount: '', // 活动人数
      activityType: '', // 活动类型
      activityContent: '', // 活动内容
      activityIconUrl: '', // 活动图片
      privated: false, // 活动形式 公开 非公开
      bookDate: '', // 日期
      bookTime: '', // 时间
      userId: '', // 预约人id
      venueId: '', // 场馆id
    },
    activityTypeRange: [
      {
        id: 1,
        name: "跳舞"
      },
      {
        id: 2,
        name: "唱歌"
      },
    ], // 活动类型列表
    selectActivityTypeIndex: -1, // 选中的活动类型index
    privateTypeRange: [
      {
        id: 1,
        name: "公开",
      },
      {
        id: 2,
        name: '非公开'
      }
    ],
    selectPrivateTypeIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    if (!checkEmpty(app.globalData.orderVenues)) {
      this.setData({
        venues: app.globalData.orderVenues,
        'submitData.venueId': app.globalData.orderVenues.venueId
      })
    }
    this.setData({
      "submitData.bookDate": options.date,
      'submitData.bookTime': options.time
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

  },

  /**
   * 点击取消
   * @param {any} e 
   */
  cancel: function(e) {
    wx.navigateBack({});
  },

  /**
   * 点击确定
   */
  confirm: function(){
    console.log('提交预约', this.data.submitData);
  },

  /**
   * 输入
   * @param {any} e 
   */
  input: function(e) {
    console.log('input 输入', e);
    let id = e.currentTarget.id;
    if (id == 'name') {
      this.setData({
        'submitData.activityIdName': e.detail.value
      })
    } else if (id == 'count') {
      this.setData({
        'submitData.activityCount': e.detail.value
      })
    } else if (id == 'content') {
      this.setData({
        'submitData.activityContent': e.detail.value
      })
    }
  },

  /**
   * 选择
   * @param {any} e 
   */
  changePicker: function(e) {
    console.log('picker 选择', e);
    let id = e.currentTarget.id;
    if (id == 'type') {
      this.setData({
        selectActivityTypeIndex: e.detail.value,
        'submitData.activityType': this.data.activityTypeRange[e.detail.value].name
      })
    } else if (id == 'private') {
      this.setData({
        selectPrivateTypeIndex: e.detail.value,
        'submitData.privated': this.data.privateTypeRange[e.detail.value].name
      })
    }
  }
})