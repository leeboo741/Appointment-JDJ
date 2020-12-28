const notificationCenter = require("../../../global/notificationCenter");
const { NOTIFICATION_SHOW_FILTER } = require("../../../resources/strings/notificationName");


const filter_key = 'venues-list'
// pages/venues/venues-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', // 搜索关键字
    venuesList: [
      {
        id: 123,
        name: '金顶街历史博物馆',
        type: '唱歌、跳舞',
        introduction: '金顶街历史博物馆，展示金顶街历史，回味历史，畅享历史，浏览历史，想象历史，体会历史',
        coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181229%2Fa0184cd52a7a437c8cab31f34048c958.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611241234&t=e812c030e3e48c6375997fef13d88a81'
      }
    ], // 场馆列表
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
    timeZone: {
      startDate: null,
      endDate: null
    }
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
   * 点击item
   * @param {any}} e 
   */
  tapItem: function(e) {
    console.log('点击场馆列表 item', e.detail.value);
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
   * 筛选 选择时间
   * @param {any} e 
   */
  changeDate: function(e) {
    this.setData({
      'timeZone.startDate': e.detail.startDate,
      'timeZone.endDate': e.detail.endDate
    })
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
  }
})