// pages/venues/venues-detail/index.js
import { checkEmpty, checkIsFunction } from "../../../utils/util";
import httpManager from "../../../global/manager/httpManager"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueId: null,
    venuesDetail: {},
    selectedDate: '2020.12.28',
    selectedTime: '09:00',
    scheduleData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.venueId = options.id;
    this.requestData(this.data.venueId);
    this.getVenuesOrderStatus(this.data.venueId);
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
   * 场馆详情数据请求
   * @param {string} venueId 场馆id
   */
  requestData: function(venueId){
    let $this = this;
    httpManager.getVenuesDetail(venueId, function(success, data) {
      if (success) {
        $this.setData({
          venuesDetail: data
        })
      }
    });
  },

  getVenuesOrderStatus: function(venueId) {
    let $this = this;
    httpManager.getVenuesOrderStatus(venueId, function(success, data) {
      if (success) {
        $this.setData({
          scheduleData: data
        })
      }
    })
  },

  /**
   * 点击预约
   */
  tapOrder: function(){
    console.log('点击预约', this.data.venuesDetail);
    const app = getApp();
    app.globalData.orderVenues = this.data.venuesDetail;
    wx.navigateTo({
      url: `/pages/venues/venues-appointment/index?id=${this.data.venuesDetail.venueId}&date=${this.data.selectedDate}&time=${this.data.selectedTime}`,
    })
  },

  /**
   * 点击排期
   * @param {any} e 
   */
  tapSchedule: function(e) {
    console.log('点击排期', e.detail.date, e.detail.time, e.detail.state);
    let msg = null;
    // if (e.detail.state == 1) {
    //   msg = '该日期已选择'
    // } else 
    if (e.detail.state == 2) {
      msg = '该日期不可选'
    } else if (e.detail.state == 4) {
      msg = '该日期已预约'
    }
    if (checkEmpty(msg)) {
      this.data.selectedDate = e.detail.date;
      this.data.selectedTime = e.detail.time;
    } else {
      this.data.selectedDate = null;
      this.data.selectedTime = null;
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },
})