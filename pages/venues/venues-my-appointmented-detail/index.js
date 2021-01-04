// pages/venues/venues-my-appointmented-detail/index.js
import Request from "../../../global/http/request";
import { checkIsFunction } from "../../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId: null,
    appointmentDetail: {
      venues: {},
      currentPeopleCount: 13,
      date: "2021.01.04 09:00-11:00",
      list: [
        {
          name: "李先生",
          phone: "16608093121",
        },
        {
          name: "李先生",
          phone: "16608093121",
        },
        {
          name: "李先生",
          phone: "16608093121",
        },
        {
          name: "李先生",
          phone: "16608093121",
        },
        {
          name: "李先生",
          phone: "16608093121",
        }
      ]
    },
    qrcodePath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.appointmentId = options.id;
    let $this = this;
    this.requestData(this.data.appointmentId, function(success, data) {
      if (success) {
        $this.setData({
          appointmentDetail: data
        })
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    });
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
   * 预约详情请求
   * @param {string} appointmentId 场馆id
   * @param {function(success, object)} callback 回调函数
   */
  requestData: function(appointmentId, callback){
    Request.request({
      url: 'getAppointmentDetail',
      data: {
        appointmentId
      }
    }, function(success, data){
      if (checkIsFunction(callback)) {
        callback(success, data);
      }
    })
  },

})