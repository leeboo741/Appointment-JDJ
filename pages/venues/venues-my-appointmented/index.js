// pages/venues/venues-my-appointmented/index.js
const notificationCenter = require("../../../global/notificationCenter");
import { checkEmpty,checkIsFunction } from '../../../utils/util';
import userDataManager from '../../../global/manager/userDataManager';
import httpManager from '../../../global/manager/httpManager';
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
    let venueId = e.detail.value.venueId;
    let activityId = e.detail.value.activityId;
    wx.navigateTo({
      url: `/pages/venues/venues-my-appointmented-detail/index?venueId=${venueId}&activityId=${activityId}`,
    })
  },

  /**
   * 数据请求
   * @param {function(boolean, data)} callback  回调
   */
  requestList: function(page, callback){
    if(checkEmpty(userDataManager.queryUserData())){
      userDataManager.showNeedLoginAlert();
    }else{
      httpManager.getBookedVenuesList(callback)
    }
    
  },

  refresh: function() {
    this.data.page = 1;
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      console.log("预约列表1111111",data);
      wx.stopPullDownRefresh()
      if (success) {
        data.forEach(item => {
          let iconUrl ='https://www.jindingjieorg.cn:9020' +item.iconUrl ;
          item.iconUrl = iconUrl
        });
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
        data.forEach(item => {
          let iconUrl ='https://www.jindingjieorg.cn:9020' +item.iconUrl ;
          item.iconUrl = iconUrl
        });
        $this.data.venuesList= $this.data.venuesList.concat(data);
        $this.setData({
          "venuesList":data
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