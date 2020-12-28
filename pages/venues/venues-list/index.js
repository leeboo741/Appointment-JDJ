const notificationCenter = require("../../../global/notificationCenter");
const { NOTIFICATION_SHOW_FILTER } = require("../../../resources/strings/notificationName");
import Request from '../../../global/http/request';
import { checkIsFunction } from '../../../utils/util';

const filter_key = 'venues-list'
// pages/venues/venues-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    keyword: '', // 搜索关键字
    venuesList: [], // 场馆列表
    filterKey: "venues-list",
    zoneRange: [
      {
        id: 1,
        name: '一区'
      },
      {
        id: 2,
        name: "二区"
      },
      {
        id: 3,
        name: '三区'
      },
      {
        id: 4,
        name: '二一区'
      },
      {
        id: 5,
        name: "二二区"
      },
      {
        id: 6,
        name: '二三区'
      }
    ],
    selectedZone: [],
    typeRange: [
      {
        id: 1,
        name: '类型一',
      },
      {
        id: 2,
        name: '类型二',
      },
      {
        id: 3,
        name: '类型三',
      },
      {
        id: 4,
        name: '类型四',
      },
      {
        id: 5,
        name: '类型五',
      },
      {
        id: 6,
        name: '类型六',
      },
    ],
    selectedType: [],
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

  },

  /**
   * 展示筛选页面
   * @param {*} e 
   */
  filterShow: function(e) {
    notificationCenter.postNotification(`${NOTIFICATION_SHOW_FILTER}-${this.data.filterKey}`, true);
  },

  /**
   * 筛选 确认
   * @param {any} e 
   */
  confirmFilter: function(e) {

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
    Request.request({
      url: 'getVenueList',
      data: {
        page,
        size: 20
      }
    }, function(success, data) {
      if (checkIsFunction(callback)) {
        callback(success, data);
      }
    })
  },

  refresh: function() {
    this.data.page = 1;
    let $this = this;
    this.requestList(this.data.page, function(success, data) {
      wx.stopPullDownRefresh()
      if (success) {
        $this.setData({
          venuesList: data
        })
        $this.data.page ++;
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
      if (success) {
        $this.data.venuesList = $this.data.venuesList.concat(data);
        $this.setData({
          venuesList
        })
        $this.data.page ++;
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    })
  }
})