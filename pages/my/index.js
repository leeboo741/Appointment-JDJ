// pages/my/index.js
import UserDataManager from "../../global/manager/userDataManager";
const { checkEmpty } = require("../../utils/util");
import httpManager from '../../global/manager/httpManager';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: null,
    operate: [
      {
        id: 'scan',
        name: "扫一扫",
        icon: '/resources/images/scan.png',
        hidden: false,
      },
      {
        id: 'my-activity',
        name: '我加入的活动',
        icon: '/resources/images/activity.png',
        url: '/pages/activities/activity-my-joined/index'
      },
      {
        id: 'my-group-joined',
        name: '我加入的团队',
        icon: '/resources/images/group.png',
        url: '/pages/groups/group-my-joined/index'
      },
      {
        id: 'my-group-created',
        name: '我发起的团队',
        icon: '/resources/images/group-2.png',
        url: '/pages/groups/group-my-created/index',
      },
      {
        id: 'my-venue',
        name: '我预约的场馆',
        icon: '/resources/images/venue.png',
        url: '/pages/venues/venues-my-appointmented/index',
        hidden: true,
      },
      {
        id: 'my-journal',
        name: '我的随拍',
        icon: '/resources/images/journal.png',
        url: '/pages/journal/journal-my/index',
      },
      {
        id: 'my-info',
        name: '我的资料',
        icon: '/resources/images/info.png',
        url: '/pages/user-info/index'
      }
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.data.userData = UserDataManager.queryUserData(this, function(userData){
      that.setData({
        userData
      })
        if(that.data.userData.userRole == 2){
                that.data.operate.forEach(function(item){
                  if(item.id == 'my-venue'){
                      item.hidden = false
                  }
                })
                that.setData({
                  operate: that.data.operate
                })

              }
    })
    this.setData({
      userData: this.data.userData
    })
    // this.setData({
    //   userData: {
    //     name: '社区王大爷',
    //     avatar: "/resources/images/logo.jpg"
    //   }
    // })
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

  /**
   * 点击申请成为召集人
   */
  tapApplyConvener: function() {
    wx.navigateTo({
      url: '/pages/convener/index',
    })
  },
    /**
   * 点击更新用户信息
   */
  updateUserInfo:function(){
        httpManager.getUserById(function(success,data){
       
         let userheadImg = UserDataManager.queryUserData().headImg;
         data.headImg = userheadImg;
         UserDataManager.updateUserData(data);
         console.log("用户信息",data);
        })
  },

  tapCell: function(e) {

    if(checkEmpty(UserDataManager.queryUserData())){
      UserDataManager.showNeedLoginAlert();
      return
    }else{
      console.log("点击",e.currentTarget.dataset.id);
    if (e.currentTarget.dataset.id == 'scan') {
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          console.log('扫码内容', res.result);
          // 截取扫码内容
            let activityId = res.result.substring(11);
            console.log('活动ID', activityId);
          if(res.result){
            httpManager.signActivity(activityId,function(scuess,data){
                if(scuess){
                  wx.showModal({
                    title: '签到成功',
                    content:'恭喜签到成功'
                  })
                }else{
                  wx.showModal({
                    title: '签到失败',
                    content:'请扫描正确二维码'
                  })
                }
            })
          }
        },
        fail:function(res){
          console.log("扫码失败",res);
          wx.showModal({
            title: '扫码失败',
            content:res
          })
        }
      })
    }else{
      let url =this.data.operate[e.currentTarget.dataset.index].url; 
      console.log("url",url);
      wx.navigateTo({
        url: url,
      })
    }
  }
  },
  tapLogin: function(){
    UserDataManager.showNeedLoginAlert();
  },
  isLink: function(id) {
    if (id == 'scan') {
      return false;
    }else if(checkEmpty(UserDataManager.queryUserData())){
    UserDataManager.showNeedLoginAlert();
    return false;
    }
    return true;
    
  }
})