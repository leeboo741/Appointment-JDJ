// pages/groups/group-my-joined/index.js
import { checkEmpty,checkIsFunction } from '../../../utils/util';
import userDataManager from '../../../global/manager/userDataManager';
import httpManager from '../../../global/manager/httpManager'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    groupList: [],
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
    console.log('点击团队列表 item', e.detail.value);
    // 发起加入团队请求
    wx.navigateTo({
      url: `/pages/groups/group-detail/index?id=${e.detail.value.tid}&joined=true`,
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
      httpManager.getJoinedGroup(callback);
    }
    
  },

  refresh: function() {
    this.data.page = 1;
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      wx.stopPullDownRefresh()
      if (success) {
        $this.setData({
          groupList: data
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
        $this.data.groupList = $this.data.groupList.concat(data);
        $this.setData({
          groupList: $this.data.groupList
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