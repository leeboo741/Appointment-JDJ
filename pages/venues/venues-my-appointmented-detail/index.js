// pages/venues/venues-my-appointmented-detail/index.js
import Request from "../../../global/http/request";
import httpManager from '../../../global/manager/httpManager';
import { checkIsFunction } from "../../../utils/util";
import drawQrcode  from '../../../utils/weapp.qrcode.esm'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId: null,
    appointmentDetail: {
    },
    list:[],
    qrcodePath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("参数",options);
    this.data.appointmentId = options.venueId; //场馆ID
    this.data.activityId = options.activityId;  //活动ID
    let $this = this;
    this.requestData(this.data.appointmentId, function(success, data) {
      if (success) {
        console.log("活动详情",data);
          let datasource = data[0];
          let iconUrl = 'https://www.jindingjieorg.cn:9020'+datasource.iconUrl;
          datasource.iconUrl = iconUrl;
        $this.setData({
          appointmentDetail: datasource
        })
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    });
    this.getQRCode(options.activityId);
    this.getUserList(options.activityId);
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
  requestData: function(activityId, callback){
    httpManager.getMyVenuesDetail(activityId,callback);
  },
  /**
   *  获取报名名单请求
   * @param {string} activityId 活动id
   * @param {function(success, object)} callback 回调函数
   */
  getUserList:function(activityId){
    let $this =this;
    httpManager.getUserList(activityId,function(success,data){
        if(success){
          console.log("报名人数",data);
          $this.list = data;
          $this.setData({
            'list':data
          })
        }
    });
  },
   /**
   *  生成二维码
   * 
   */
  getQRCode:function(activityId){
    console.log("活动ID",activityId)
    let $this = this;
    drawQrcode({
      text: `activityId=${activityId}`,
      width: 100,
      height: 100,
      canvasId: 'myQrcode',
      callback: (res) => {
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: 'myQrcode',
            success: function (res) {
              var tempFilePath = res.tempFilePath;
              console.log('图片地址',tempFilePath);
              $this.setData({
                codeImg:tempFilePath
              })
            }
          });
        }, 200);
      }
    })
  }
})