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
    filterKey: "venues-list"
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
  }
})