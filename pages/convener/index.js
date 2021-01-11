// pages/convener/index.js
import httpManager from '../../global/manager/httpManager'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitData: {
      activityId: "",
      idcardFrontUrl: "",
      idcardBackUrl: ""
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
   * 选择
   * @param {any} e 
   */
  changePicker: function(e) {
    let id = e.currentTarget.id;
    if (id == 'type') {
      this.setData({
        selectActivityTypeIndex: e.detail.value,
        'submitData.activityId': this.data.activityTypeRange[e.detail.value].id
      })
    }
  },

  tapApply: function(e) {
    console.log('点击申请', this.data.submitData);
    httpManager.applyConvener(this.data.submitData.activityId, this.data.submitData.idcardFrontUrl, this.data.submitData.idcardBackUrl, function(success, data) {
      if (success) {
        wx.showModal({
          title: '申请召集人',
          content: '您已成功申请成为召集人',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({})
            }
          }
        })
      }
    })
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