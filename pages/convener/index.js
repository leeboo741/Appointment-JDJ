// pages/convener/index.js
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
    activityTypeRange: [
      {
        id: 1,
        name: "跳舞"
      },
      {
        id: 2,
        name: "唱歌"
      },
    ], // 活动类型列表
    selectActivityTypeIndex: -1, // 选中的活动类型index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})