const { checkEmpty } = require("../../../utils/util");
import httpManager from '../../../global/manager/httpManager';
import userDataManager from '../../../global/manager/userDataManager';

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
    activityTypeRange: [], // 活动类型列表
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
    console.log("预约场馆的时间",options.date);
    this.setData({
      "submitData.bookDate": options.date,
      'submitData.bookTime': options.time
    })
    
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
   * @param {any} e 
   */
  cancel: function(e) {
    wx.navigateBack({});
  },

  
  /**
   * 上传图片
   * @param {any} e 
   */
  uploadImg:function(e){
    console.log("上传",e);
    this.data.submitData.activityIconUrl = e.detail;
  },
  deleteImg:function(){
    this.data.submitData.activityIconUrl ='';
  },

  /**
   * 点击确定
   */
  confirm: function(){
    console.log("用户权限",userDataManager.queryUserData().userRole);
    if(checkEmpty(userDataManager.queryUserData())){
      userDataManager.showNeedLoginAlert()
      
    }else if(userDataManager.queryUserData().userRole != 2){
        wx.showModal({
          title: '前往申请成为召集人',
          content:'只有召集人才可预约场馆',
          confirmText:'立即前往',
          cancelText:'暂不前往',
          success:function(res){
            if(res.confirm){
              console.log("确定")
              wx.navigateTo({
                url:'/pages/convener/index'
              })
            }else{

            }
          }
        })
    }else{
    if(checkEmpty(this.data.submitData.activityIdName)){
      wx.showToast({
        title:'请填写活动名称',
        icon:'none'
      })
      return 
    }else if(checkEmpty(this.data.submitData.activityType)){
      wx.showToast({
        title:'请填写活动类型',
        icon:'none'
      })
      return 
    }else if(checkEmpty(this.data.submitData.activityCount)){
      wx.showToast({
        title:'请填写活动人数',
        icon:'none'
      })
      return 
    }else if(checkEmpty(this.data.submitData.activityContent)){
      wx.showToast({
        title:'请填写活动内容',
        icon:'none'
      })
      return 
    }else if(checkEmpty(this.data.submitData.activityIconUrl)){
      wx.showToast({
        title:'请上传活动照片',
        icon:'none'
      })
      return 
    }else if(checkEmpty(this.data.submitData.status)){
      wx.showToast({
        title:'请填写活动形式',
        icon:'none'
      })
      return 
    }
    console.log('提交预约', this.data.submitData);
    httpManager.orderVenues(this.data.submitData, function(success, data){
      if (success) {
        wx.showToast({
          title:'预约成功',
          icon:"none"
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/home/index'
          });
        },1000)
       
      }
    })
  }
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
        'submitData.activityCount': Number(e.detail.value)
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
        'submitData.activityType': this.data.activityTypeRange[e.detail.value].id
      })
    } else if (id == 'private') {
      this.setData({
        selectPrivateTypeIndex: e.detail.value,
        'submitData.status': this.data.privateTypeRange[e.detail.value].id
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