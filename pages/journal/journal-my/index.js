// pages/journal/journal-my/index.js
import UserDataManager from '../../../global/manager/userDataManager';
const { checkEmpty } = require("../../../utils/util");
import httpManager from '../../../global/manager/httpManager';
import NotificationCenter from '../../../global/notificationCenter';
import {NOTIFICATION_SHOW_COMMENT} from '../../../resources/strings/notificationName';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: null,
    dataSource: [
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    wx.startPullDownRefresh({
      success: (res) => {},
    })
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
    this.getList(1, function(success, data){
      console.log("下发的数据",data);
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      if (success && !checkEmpty(data)) {
        //拼接图片地址
        let uerheadImg = UserDataManager.queryUserData().headImg;
        console.log("用户头像",uerheadImg);
        data.forEach(function(item,index){  
          item.headImg = uerheadImg;
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

        console.log("处理之后的数据",$this.data.dataSource);
      } else {

      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let $this = this;
    this.getMyJournalList(this.data.page, function(success, data){
      if (success && !checkEmpty(data)) {
        let uerheadImg = UserDataManager.queryUserData().headImg;
        data.forEach(function(item,index){  
          data.headImg = uerheadImg;
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
   /**
   * 请求随拍列表
   * @param {any} page 
   */
  getList: function(page,callback) {
    httpManager.getMyJournalList(page,callback);
  },

  /**
   * 点击评论
   * @param {any} event 
   */
  comment: function(event) {
    console.log('comment', event);
    if (this.data.userData) {

    } else {
      // UserDataManager.showNeedLoginAlert();

      NotificationCenter.postNotification(NOTIFICATION_SHOW_COMMENT, true);
    }
  },

  /**
   * 喜欢
   * @param {any} event 
   */
  like: function(event) {
    console.log('like', event);
    if (this.data.userData) {

    } else {
      UserDataManager.showNeedLoginAlert();
    }
  },

  /**
   * 点击发布
   */
  tapPublish: function() {
    if (this.data.userData) {
      wx.navigateTo({
        url: '/pages/journal/journal-create',
      })
    } else {
      // UserDataManager.showNeedLoginAlert()

      wx.navigateTo({
        url: '/pages/journal/journal-create/index',
      })
    }
  }
})