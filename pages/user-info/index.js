// pages/user-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
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
    sexRange: [
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      }
    ],
    selectSexIndex: -1, // 选中的性别index
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
   * 点击确定
   */
  confirm: function(){
    console.log('修改信息', this.data.userInfo);
  },

  /**
   * 选择日期
   * @param {any} e 
   */
  changeDate: function(e) {
    let id = e.currentTarget.id;
    if (id == 'birthday') {
      this.setData({
        'userInfo.birthday': e.detail.value
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
        'userInfo.tname': e.detail.value
      })
    } 
  },

  changePicker: function(e) {
    let id = e.currentTarget.id;
    if (id == 'sex') {
      this.setData({
        selectSexIndex: e.detail.value,
        'userInfo.sex': this.data.sexRange[e.detail.value].name
      })
    }
  }
})