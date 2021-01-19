// pages/home/home.js
import httpManager from '../../global/manager/httpManager';
import UserDataManager from '../../global/manager/userDataManager';
import {checkEmpty} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    activities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerData();
    this.getActivityData();
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
   * 点击搜索框 右侧按钮
   */
  tapSearchRight: function() {
    console.log('tapSearchRight');
  },

  /**
   * 搜索框输入
   * @param {object} e 
   */
  inputSearch: function(e) {
    console.log('inputSearch', e);
  },

  /**
   * 搜索框输入确认
   * @param {object} e 
   */
  confirmSearch: function(e) {
    console.log('confirmSearch', e);
  },

  /**
   * 搜索框输入聚焦
   * @param {object} e 
   */
  focusSearch: function(e) {
    console.log('focusSearch', e);
  },

  /**
   * 搜索框输入失焦
   * @param {object} e 
   */
  blurSearch: function(e) {
    console.log('blurSearch', e);
  },

  /**
   * 点击场馆预约
   */
  tapOrder: function(){
    wx.navigateTo({
      url: '/pages/venues/venues-list/index',
    })
  },

  /**
   * 点击场馆预约规则
   */
  tapOrderRule: function(){
    wx.navigateTo({
      url: '/pages/venues/venues-appointment-rule/index',
    })
  },

  /**
   * 点击创建团队
   */
  tapCreatedGroup: function(){
    console.log("是否登录",checkEmpty(UserDataManager.queryUserData()))
    if(checkEmpty(UserDataManager.queryUserData())){
      UserDataManager.showNeedLoginAlert();
    }else{
      wx.navigateTo({
        url: '/pages/groups/group-create/index',
      })
    }
   
  },

  /**
   * 点击加入团队
   */
  tapJoinedGroup: function(){
    if(checkEmpty(UserDataManager.queryUserData())){
      UserDataManager.showNeedLoginAlert();
    }else{
      wx.navigateTo({
        url: '/pages/groups/group-list/index',
      })
    }

  },

  /**
   * 点击查看更多活动
   */
  tapMoreActivity: function() {
    wx.navigateTo({
      url: '/pages/activities/activity-list/index',
    })
  },

  /**
   * 点击活动
   * @param {any} e 
   */
  tapActivity: function(e) {
    wx.navigateTo({
      url: `/pages/activities/activity-detail/index?id=${e.currentTarget.dataset.obj.activityId}`,
    })
  },

  /**
   * 点击参加活动
   * @param {any} e 
   */
  tapJoinActivity: function(e) {
    if(checkEmpty(UserDataManager.queryUserData())){
      UserDataManager.showNeedLoginAlert();
    }else{
     
  
    console.log('点击参加活动', e.currentTarget.dataset.obj);
    this.joinActivity(e.currentTarget.dataset.obj.activityId, function(success, data){
      if (success) {
        wx.showModal({
          title: '成功参加活动',
          content: `您已成功参加活动${e.currentTarget.dataset.obj.activityIdName}`,
          showCancel: false
        })
      }
    })
  }
  },

  /**
   * 获取banner数据
   */
  getBannerData: function(){
    let $this = this;
    httpManager.getBannerData(0, function(success, data) {
      if (success) {
        $this.setData({
          bannerData: data
        })
      }
    })
  },

  getActivityData: function(){
    let $this = this;
    httpManager.getActivityListData(1, function(success, data) {
      if (success) {
        console.log("活动",data)
        data.forEach(item => {
          let activityIconUrl ='https://www.jindingjieorg.cn:9020' +item.activityIconUrl ;
          item.activityIconUrl = activityIconUrl
        });
        $this.setData({
          activities: data
        })
      }
    })
  },

  joinActivity: function(activityId, callback) {
    let $this = this;
    httpManager.joinActivity(activityId, callback);
  }
})