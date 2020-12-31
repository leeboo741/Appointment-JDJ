// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2690349196,3296263947&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3276709640,3891421934&fm=26&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3224420074,1885140053&fm=26&gp=0.jpg"
    ],
    activities: [
      {
        title: '社区老年书法比赛',
        content: '社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛',
        coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181229%2Fa0184cd52a7a437c8cab31f34048c958.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611241234&t=e812c030e3e48c6375997fef13d88a81'
      },
      {
        title: '社区老年书法比赛社区老年书法比赛',
        content: '社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛',
        coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181229%2Fa0184cd52a7a437c8cab31f34048c958.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611241234&t=e812c030e3e48c6375997fef13d88a81'
      },
      {
        title: '社区老年书法比赛',
        content: '社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛社区老年书法比赛',
        coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181229%2Fa0184cd52a7a437c8cab31f34048c958.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611241234&t=e812c030e3e48c6375997fef13d88a81'
      }
    ]
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
   * 点击搜索框 右侧按钮
   */
  tapSearchRight: function() {
    console.log('tapSearchRight');
  },

  /**
   * 搜索框输入
   * @param {object} e 
   */
  inputSearch: function(e) {
    console.log('inputSearch', e);
  },

  /**
   * 搜索框输入确认
   * @param {object} e 
   */
  confirmSearch: function(e) {
    console.log('confirmSearch', e);
  },

  /**
   * 搜索框输入聚焦
   * @param {object} e 
   */
  focusSearch: function(e) {
    console.log('focusSearch', e);
  },

  /**
   * 搜索框输入失焦
   * @param {object} e 
   */
  blurSearch: function(e) {
    console.log('blurSearch', e);
  },

  /**
   * 点击场馆预约
   */
  tapOrder: function(){
    wx.navigateTo({
      url: '/pages/venues/venues-list/index',
    })
  },

  /**
   * 点击场馆预约规则
   */
  tapOrderRule: function(){
    wx.navigateTo({
      url: '/pages/venues/venues-appointment-rule/index',
    })
  },

  /**
   * 点击创建团队
   */
  tapCreatedGroup: function(){
    wx.navigateTo({
      url: '/pages/groups/group-create/index',
    })
  },

  /**
   * 点击加入团队
   */
  tapJoinedGroup: function(){
    wx.navigateTo({
      url: '/pages/groups/group-list/index',
    })
  },

  /**
   * 点击查看更多活动
   */
  tapMoreActivity: function() {
    wx.navigateTo({
      url: '/pages/activities/activity-list/index',
    })
  },

  /**
   * 点击活动
   * @param {any} e 
   */
  tapActivity: function(e) {
    wx.navigateTo({
      url: `/pages/activities/activity-detail/index?id=${e.currentTarget.dataset.obj.activityId}`,
    })
  },

  /**
   * 点击参加活动
   * @param {any} e 
   */
  tapCancelActivity: function(e) {
    console.log('点击参加活动', e.currentTarget.dataset.obj);
  }
})