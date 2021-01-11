// pages/venues/venues-list/index.js
const notificationCenter = require("../../../global/notificationCenter");
import { checkEmpty, checkIsFunction } from '../../../utils/util';
import httpManager from "../../../global/manager/httpManager";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    keyword: '', // 搜索关键字
    venuesList: [], // 场馆列表
    filterKey: "venues-list-filter",
    zoneRange: [],
    selectedZone: [],
    typeRange: [],
    selectedType: [],
    count: 10,
    countZone: {
      startCount: null,
      endCount: null
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh();
    this.getCommitteeList();
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
    this.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击item
   * @param {any}} e 
   */
  tapItem: function(e) {
    console.log('点击场馆列表 item', e.detail.value);
    wx.navigateTo({
      url: `/pages/venues/venues-detail/index?id=${e.detail.value.venueId}`,
    })
  },

  /**
   * 输入
   * @param {any} e 
   */
  input: function(e) {
    this.data.keyword = e.detail.value;
  },

  /**
   * 确认搜索
   * @param {any} e 
   */
  confirm: function(e) {
    wx.startPullDownRefresh()
  },

  /**
   * 展示筛选页面
   * @param {*} e 
   */
  filterShow: function(e) {
    notificationCenter.postNotification(this.data.filterKey, true);
  },

  /**
   * 筛选 确认
   * @param {any} e 
   */
  confirmFilter: function(e) {
    wx.startPullDownRefresh()
  },

  /**
   * 筛选 重置
   * @param {any} e 
   */
  resetFilter: function(e) {
    this.setData({
      selectedZone: [],
      selectedType: [],
      countZone: {
        startCount: null,
        endCount: null
      }
    })
    wx.startPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 筛选 选择标签
   * @param {any}} e 
   */
  selectedTag: function(e) {
    if (e.currentTarget.id == 'zone') {
      this.setData({
        selectedZone: e.detail.value
      })
    } else if (e.currentTarget.id == 'type') {
      this.setData({
        selectedType: e.detail.value
      })
    }
  },

  /**
   * 筛选 输入数量
   * @param {any} e 
   */
  inputCount: function(e) {
    this.setData({
      'countZone.startCount': e.detail.startCount,
      'countZone.endCount': e.detail.endCount
    })
  },

  /**
   * 数据请求
   * @param {function(boolean, data)} callback  回调
   */
  requestList: function(page, callback){
    httpManager.getVenuesList(page, this.data.keyword, checkEmpty(this.data.selectedZone)?null:this.data.selectedZone[0].cid, checkEmpty(this.data.selectedType)?null:this.data.selectedType[0].id, this.data.count, callback);
  },

  refresh: function() {
    let $this = this;
    this.requestList(1, function(success, data) {
      wx.stopPullDownRefresh()
      if (success) {
        $this.setData({
          page: 2,
          venuesList: data
        })
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    })
  },

  loadMore: function(){
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      if (success && !checkEmpty(data)) {
        $this.setData({
          page: $this.data.page + 1,
          venuesList: $this.data.venuesList.concat(data)
        })
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    })
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
   * 获取活动类型列表
   */
  getActivityType: function(){
    let $this = this;
    httpManager.getActivityTypeDict(function(success, data) {
      if (success) {
        $this.setData({
          typeRange: data
        })
      }
    })
  }
})