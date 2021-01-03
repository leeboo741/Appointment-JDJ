// pages/venues/venues-my-appointmented/index.js
const notificationCenter = require("../../../global/notificationCenter");
import Request from '../../../global/http/request';
import { checkIsFunction } from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    venuesList: [], // 场馆列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh();
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
    this.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击item
   * @param {any}} e 
   */
  tapItem: function(e) {
    console.log('点击已预约场馆列表 item', e.detail.value);
    wx.navigateTo({
      url: `/pages/venues/venues-my-appointmented-detail/index?id=${e.detail.value.venueId}`,
    })
  },

  /**
   * 数据请求
   * @param {function(boolean, data)} callback  回调
   */
  requestList: function(page, callback){
    Request.request({
      url: 'getVenueList',
      data: {
        page,
        size: 20,
      }
    }, function(success, data) {
      if (checkIsFunction(callback)) {
        callback(success, data);
      }
    })
  },

  refresh: function() {
    this.data.page = 1;
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      wx.stopPullDownRefresh()
      if (success) {
        $this.setData({
          venuesList: data
        })
        $this.data.page ++;
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    })
  },

  loadMore: function(){
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      if (success) {
        $this.data.venuesList = $this.data.venuesList.concat(data);
        $this.setData({
          venuesList
        })
        $this.data.page ++;
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    })
  }
})