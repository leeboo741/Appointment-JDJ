// pages/groups/group-detail/index.js
import httpManager from '../../../global/manager/httpManager'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {
      id: null,
      joined: null,
      my: null,
    },
    groupDetail: {},
    list: [
      {
        name: '李先生',
        phone: '16607093121'
      },
      {
        name: '李先生',
        phone: '16607093121'
      },
      {
        name: '李先生',
        phone: '16607093121'
      },
      {
        name: '李先生',
        phone: '16607093121'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options
    })
    this.getDetail(options.id)
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
   * 退出团队
   */
  cancel: function(){
    console.log('退出团队')
  },

  /**
   * 加入团队
   */
  confirm: function(){
    console.log('加入团队')
    this.joinGroup(this.data.options.id);
  },

  /**
   * 关闭
   */
  close: function(){
    console.log('关闭')
  },

  /**
   * 开放
   */
  open: function(){
    console.log('开放')
  },

  getDetail: function(teamId) {
    let $this = this;
    httpManager.getGroupDetail(teamId, function(success, data) {
      if (success) {
        $this.setData({
          groupDetail: data
        })
      }
    })
  },

  joinGroup: function(teamId) {
    let $this = this;
    httpManager.joinGroup(teamId, function(success, data) {
      if (success) {
        wx.showModal({
          title: '成功加入团队',
          content: `您已成功加入团队《${$this.data.groupDetail.tname}》`,
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({})
            }
          }
        })
      }
    })
  }
})