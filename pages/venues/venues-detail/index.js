// pages/venues/venues-detail/index.js
import { checkEmpty, checkIsFunction } from "../../../utils/util";
import httpManager from "../../../global/manager/httpManager";
import userDataManager from '../../../global/manager/userDataManager';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueId: null,
    venuesDetail: {},
    selectedDate: '',
    selectedTime: '',
    scheduleData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.venueId = options.id;
    this.requestData(this.data.venueId);
    this.getVenuesOrderStatus(this.data.venueId);
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
   * 场馆详情数据请求
   * @param {string} venueId 场馆id
   */
  requestData: function(venueId){
    let $this = this;
    httpManager.getVenuesDetail(venueId, function(success, data) {
      if (success) {
        console.log("详情",data);
          let iconUrl ='https://www.jindingjieorg.cn:9020' +data.iconUrl ;
          data.iconUrl = iconUrl
        $this.setData({
          venuesDetail: data
        })
      }
    });
  },

  getVenuesOrderStatus: function(venueId) {
    let $this = this;
    httpManager.getVenuesOrderStatus(venueId, function(success, data) {
      if (success) {
        $this.setData({
          scheduleData: data
        })
      }
    })
  },

  /**
   * 点击预约
   */
  tapOrder: function(){
    console.log('点击预约', this.data.venuesDetail);
    const app = getApp();
    let $this = this;
    // 选中才能进入下一页
    if(checkEmpty(userDataManager.queryUserData())){
      userDataManager.showNeedLoginAlert()
      
    }else if(checkEmpty($this.data.selectedDate)&&checkEmpty($this.data.selectedTime)){
      wx.showToast({
        title:'请选择预约时间',
        icon:"none"
      })
  }else{

    app.globalData.orderVenues = this.data.venuesDetail;
    wx.navigateTo({
      url: `/pages/venues/venues-appointment/index?id=${this.data.venuesDetail.venueId}&date=${this.data.selectedDate}&time=${this.data.selectedTime}`,
    })
  }
  },

  /**
   * 点击排期
   * @param {any} e 
   */
  tapSchedule: function(e) {
    console.log('点击排期', e.detail.date, e.detail.time, e.detail.state);

    let $this = this;
      
    let msg = null;
    // if (e.detail.state == 1) {
    //   msg = '该日期已选择'
    // } else 
    if (e.detail.state == 1) {
      msg = '该日期不可选'
    } else if (e.detail.state == 2) {
      msg = '该日期已预约'
    }
    if (checkEmpty(msg)) {
     
      this.data.selectedDate = e.detail.date;
      this.data.selectedTime = e.detail.time;
      // 点击切换颜色
      //先让清空之前的已选，再选择
      this.data.scheduleData.forEach(function(item,index){
          item.list.forEach(function(timeObj,index){
            if(timeObj.state == 3){
              timeObj.state = 0
            }
          })
      })
      this.data.scheduleData.forEach(function(item,index){
        if(item.date == $this.data.selectedDate){
          item.list.forEach(function(timeObj,index){
            if(timeObj.time == $this.data.selectedTime){
              timeObj.state = 3
            }
          })
        }
      })
      this.setData({
        'scheduleData':this.data.scheduleData
      })
      console.log("点击之后",this.data.scheduleData);
    } else {
      this.data.selectedDate = null;
      this.data.selectedTime = null;
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },
})