// pages/user-info/index.js
import httpManager from '../../global/manager/httpManager'
import UserManager from '../../global/manager/userDataManager'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    activityTypeRange: [], // 活动类型列表
    selectActivityTypeIndex: -1, // 选中的活动类型index
    zoneRange: [],
    selectZoneIndex: -1,
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
    this.getCommitteeList();
    this.getActivityType();
    this.getUserById();
    console.log("用户信息",UserManager.queryUserData());
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
    this.updateUser(this.data.userInfo.uname, this.data.userInfo.sex, this.data.userInfo.birthday);
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
        'userInfo.uname': e.detail.value
      })
    } 
  },

  changePicker: function(e) {
    let id = e.currentTarget.id;
    if (id == 'sex') {
      this.setData({
        selectSexIndex: e.detail.value,
        'userInfo.sex': e.detail.value
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
  },

  getUserById: function() {
    let $this = this;
    let data = UserManager.queryUserData();
    $this.setData({
      'userInfo':data,
      'selectSexIndex': parseInt(data.sex)
    })
    // httpManager.getUserById(function(success, data) {
    //   if (success) {
    //     $this.setData({
    //       userInfo: data,
    //       selectSexIndex: parseInt(data.sex)
    //     })
    //   }
    // })
  },

  /**
   * 获取居委会列表
   */
  getCommitteeList: function(){
    let $this = this;
    httpManager.getCommitteeList(function(success, data){
      if(success) {
        $this.setData({
          zoneRange: data
        })
      }
    })
  },

  /**
   * 编辑用户
   */
  updateUser: function(userName, sex, birthday){
    let $this = this;
    httpManager.updateUser(userName, sex, birthday, function(success, data){
      if (success) {
        wx.showModal({
          title: '成功修改信息',
          content: '您已成功提交信息的修改',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              UserManager.updateUserData($this.data.userInfo);
              wx.navigateBack({})
            }
          }
        })
      }
    })
  }
})