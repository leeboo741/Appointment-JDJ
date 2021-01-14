// pages/activities/activity-my-joined/index.js
import { checkIsFunction } from '../../../utils/util';
import httpManager from "../../../global/manager/httpManager";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: []
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
    console.log('点击参加活动列表 item', e.detail.value);
    wx.navigateTo({
      url: `/pages/activities/activity-detail/index?id=${e.detail.value.activityId}&joined=true`,
    })
  },

  /**
   * 数据请求
   * @param {function(boolean, data)} callback  回调
   */
  requestList: function(page, callback){
    httpManager.getJoinedActivity(callback);
  },

  /**
   * 刷新数据
   */
  refresh: function() {
    this.data.page = 1;
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      wx.stopPullDownRefresh()
      if (success) {
        $this.setData({
          activityList: data
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

  /**
   * 加载更多
   */
  loadMore: function(){
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      if (success) {
        $this.data.activityList = $this.data.activityList.concat(data);
        $this.setData({
          activityList: $this.data.activityList
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

  /**
   * 取消预约 
   * @param {any} e 
   */
  cancel: function(e) {
    let $this = this;
    let activity = this.data.activityList[e.currentTarget.dataset.index];
    wx.showModal({
      title: '确认退出',
      content: `确认退出活动：${activity.activityIdName}`,
      cancelText: '点错了',
      confirmText: '确认退出',
      cancelColor: '#ee2c2c',
      success(res) {
        if (res.confirm) {
          httpManager.quitActivity(activity.activityId,function(success, data){
            if (success) {
              wx.navigateBack({})
            }
          })
        }
      }
    })
  }
})