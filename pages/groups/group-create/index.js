// pages/groups/group-create/index.js
import httpManager from '../../../global/manager/httpManager'
import UserManager from '../../../global/manager/userDataManager';
import { checkEmpty } from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitData: {
      uid: '',
      tname: "",
      peopleCount: '',
      activityType: "",
      activityContent: '',
      enterCondition: ''
    },
    activityTypeRange: [], // 活动类型列表
    selectActivityTypeIndex: -1, // 选中的活动类型index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActivityType();
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
   */
  cancel: function(){
    wx.navigateBack({})
  },

  /**
   * 点击确定
   */
  confirm: function(){
    console.log('创建团队', this.data.submitData);
    if (checkEmpty(UserManager.getUserId())) {
      UserManager.showNeedLoginAlert();
    } else {
      let $this = this;
      httpManager.createGroup(this.data.submitData, function(success, data) {
        if (success) {
          wx.showModal({
            title: '创建团队成功',
            content: `您已成功创建团队《${$this.data.submitData.tname}》`,
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
   * 输入
   * @param {any} e 
   */
  input: function(e) {
    let id = e.currentTarget.id;
    if (id == 'name') {
      this.setData({
        'submitData.tname': e.detail.value
      })
    } else if (id == 'count') {
      this.setData({
        'submitData.peopleCount': e.detail.value
      })
    } else if (id == 'content') {
      this.setData({
        'submitData.activityContent': e.detail.value
      })
    } else if (id == 'condition') {
      this.setData({
        'submitData.enterCondition': e.detail.value
      })
    }
  },

  changePicker: function(e) {
    let id = e.currentTarget.id;
    if (id == 'type') {
      this.setData({
        selectActivityTypeIndex: e.detail.value,
        'submitData.activityType': this.data.activityTypeRange[e.detail.value].id
      })
    }
  },
  
  /**
   * 获取活动类型列表
   */
  getActivityType: function(){
    let $this = this;
    httpManager.getActivityTypeDict(function(success, data) {
      if (success) {
        $this.setData({
          activityTypeRange: data
        })
      }
    })
  }
})