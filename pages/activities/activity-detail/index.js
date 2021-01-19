// pages/activities/activity-detail/index.js
import httpManager from "../../../global/manager/httpManager";
import UserDataManager from '../../../global/manager/userDataManager';
import {checkEmpty} from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {
      id: null,
      joined: null
    },
    activityDetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options
    })
    this.getDetail(this.options.id);
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
   * 点击立即报名
   */
  tapOrder: function(){
    console.log('报名活动')
    if(checkEmpty(UserDataManager.queryUserData())){
      UserDataManager.showNeedLoginAlert();
    }else{

 
    let $this = this;
    httpManager.joinActivity(this.data.options.id, function(success, data) {
      if (success) {
        wx.showModal({
          title: '报名成功',
          content: `您已成功报名活动《${$this.data.activityDetail.activityIdName}》`,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({})
            }
          }
        })
      }
    })
  }
  },

  /**
   * 点击退出活动
   */
  tapCancel: function() {
    let $this = this;
    httpManager.cancelActivity($this.data.options.id,function(success, data){
      if (success) {
        wx.showToast({
          title: '退出成功',
        })
        setTimeout(function(){
          wx.navigateBack({})
        },1000)
        
      }
    })
  },

  /**
   * 获取详情
   * @param {string} activityId 
   */
  getDetail: function(activityId){
    let $this = this;
    httpManager.getActivityDetail(activityId, function(success, data){
      console.log("详情",data);
      data.activityIconUrl = 'https://www.jindingjieorg.cn:9020' +data.activityIconUrl 
      if (success) {
        $this.setData({
          activityDetail: data
        })
      }
    })
  }
})