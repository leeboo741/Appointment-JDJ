// pages/journal/journal-list/index.js
import UserDataManager from '../../../global/manager/userDataManager';
import NotificationCenter from '../../../global/notificationCenter';
import {NOTIFICATION_SHOW_COMMENT} from '../../../resources/strings/notificationName';
import httpManager from '../../../global/manager/httpManager'
import { checkEmpty } from '../../../utils/util';
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
      
    ],
    page: 1,
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
    this.getBannerData();
    wx.startPullDownRefresh({
      success: (res) => {},
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
    let $this = this;
    this.getJournalList(1, function(success, data){
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      if (success && !checkEmpty(data)) {

        data.forEach(function(item,index){  
          item.pitureUrlsList = item.pitureUrls.split(",");
          if(item.pitureUrlsList.length>0&&item.pitureUrlsList[0]!=""){
            item.pitureUrlsList = item.pitureUrlsList.map(function(url){
               return 'https://www.jindingjieorg.cn:9020/picture/'+ url
          })
        }
        })
        $this.setData({
          page: 2,
          dataSource: data
        })
      } else {

      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let $this = this;
    this.getJournalList(this.data.page, function(success, data){
      if (success && !checkEmpty(data)) {
        data.forEach(function(item,index){  
          item.pitureUrlsList = item.pitureUrls.split(",");
          if(item.pitureUrlsList.length>0&&item.pitureUrlsList[0]!=""){
            item.pitureUrlsList = item.pitureUrlsList.map(function(url){
               return 'https://www.jindingjieorg.cn:9020/picture/'+ url
          })
        }
        })

        $this.setData({
          page: $this.data.page + 1,
          dataSource: $this.data.dataSource.concat(data)
        })
      } else {

      }
    })
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
      // UserDataManager.showNeedLoginAlert();

      NotificationCenter.postNotification(NOTIFICATION_SHOW_COMMENT, true);
    }
  },

  like: function(event) {
    console.log('like', event);
    if (this.data.userData) {

    } else {
      UserDataManager.showNeedLoginAlert();
    }
  },

  getBannerData: function(){
    let $this = this;
    httpManager.getBannerData(1, function(success, data) {
      if (success) {
        $this.setData({
          bannerData: data
        })
      }
    })
  },

  getJournalList: function(page, callback) {
    let $this = this;
    httpManager.getJournalList(page, callback);
  }
})