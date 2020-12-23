// pages/journal/journal-list/index.js
import UserDataManager from '../../../global/manager/userDataManager';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: null,
    bannerData: [
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2690349196,3296263947&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3276709640,3891421934&fm=26&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3224420074,1885140053&fm=26&gp=0.jpg"
    ],
    dataSource: [
      {
        id: 1234,
        name: "隔壁王大爷",
        avater: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3224420074,1885140053&fm=26&gp=0.jpg',
        time: "2020-02-11 13:33:33",
        title: "最美书法大赛",
        content: "最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛最美书法大赛",
        imageList: [
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2690349196,3296263947&fm=26&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3276709640,3891421934&fm=26&gp=0.jpg",
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3224420074,1885140053&fm=26&gp=0.jpg"
        ],
        watchCount: 5000,
        likeCount: 13,
        commentCount: 30
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.userData = UserDataManager.queryUserData(this, function(userData){
      that.setData({
        userData
      })
    })
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
    UserDataManager.removeUserDataChangeObserver(this);
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

  comment: function(event) {
    console.log('comment', event);
    if (this.data.userData) {

    } else {
      UserDataManager.showNeedLoginAlert();
    }
  },

  like: function(event) {
    console.log('like', event);
    if (this.data.userData) {

    } else {
      UserDataManager.showNeedLoginAlert();
    }
  }
})