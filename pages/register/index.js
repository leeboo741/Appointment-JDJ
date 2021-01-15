// pages/register/index.js
import {checkEmpty} from '../../utils/util';
import NotificationCenter from '../../global/notificationCenter';
import { NOTIFICATION_SHOW_GETUSERINFO, NOTIFICATION_SHOW_GETPHONE } from '../../resources/strings/notificationName';
import httpManager from '../../global/manager/httpManager';
import UserDataManager from "../../global/manager/userDataManager";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    submitData: {
      avatarUrl: null,
      name: "",
      sexIndex: 0,
      sex: null,
      birthday: null,
      phone:"",
      committeeIndex: 0,
      committee: null,
      checkContract: true,
      openId: null
    },
    sexRange: [
      {
        name: '男',
        value: 0
      },
      {
        name: '女',
        value: 1
      }
    ],
    committeeRange: [],
    notGetUserInfo: true,
    notGetPhone: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openId = options.openid;
    this.data.submitData.openId = this.data.openId;
    console.log('注册-openid', this.data.openId);
    this.getCommitteeList();
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
   * 点击用户须知协议
   */
  tapContract: function(){
    console.log('用户须知')
  },

  /**
   * 点击注册
   */
  tapRegister: function(){
    if (!this.checkSubmitData(this.data.submitData)) return;
    console.log('注册')
    httpManager.register(this.data.submitData, function(success, data){
      if (success) {
        if (!checkEmpty(data)) {
          UserDataManager.updateUserData(data);
        }
        wx.showModal({
          title: '注册成功',
          content: '欢迎注册金顶街预约系统！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({})
            }
          }
        })
      }
    })
  },

  /**
   * 检查表单数据
   * @retrun true可/false否
   */
  checkSubmitData: function(submitData){
    if (this.checkDataEmpty(submitData.name,'姓名不能为空')) return false;
    if (this.checkDataEmpty(submitData.sex,'性别不能为空')) return false;
    if (this.checkDataEmpty(submitData.birthday,'生日不能为空')) return false;
    if (this.checkDataEmpty(submitData.phone,'电话不能为空')) return false;
    if (this.checkDataEmpty(submitData.committee,'社区不能为空')) return false;
    if (!submitData.checkContract) {
      wx.showToast({
        title: '请确认须知',
        icon: 'none'
      })
      return false;
    }
    return true;
  },

  checkDataEmpty: function(data, msg) {
    if (checkEmpty(data)) {
      if (checkEmpty(msg)) msg = '必填项未填写';
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return true;
    }
    return false;
  },

  /**
   * 输入框聚焦
   * @param {any} e 
   */
  focus: function(e) {
    console.log('输入框聚焦', e);
    // let id = e.currentTarget.id;
    // if (id == 'name') {
    //   if (this.data.notGetUserInfo) {
    //     NotificationCenter.postNotification(NOTIFICATION_SHOW_GETUSERINFO, true);
    //     this.data.notGetUserInfo = false;
    //   }
    // } else if (id == 'phone') {
    //   if (this.data.notGetPhone) {
    //     NotificationCenter.postNotification(NOTIFICATION_SHOW_GETPHONE, true);
    //     this.data.notGetPhone = false;
    //   }
    // }
  },

  /**
   * 输入框输入
   * @param {any} e 
   */
  input: function(e) {
    console.log('输入框输入', e);
    let id = e.currentTarget.id;
    if (id == 'name') {
      this.setData({
        'submitData.name': e.detail.value
      })
    } else if (id == 'phone') {
      this.setData({
        'submitData.phone': e.detail.value
      })
    }
  },

  /**
   * 选择器选择
   * @param {any} e 
   */
  changePicker: function(e) {
    console.log('选择器选择', e);
    let id = e.currentTarget.id;
    if (id == 'sex') {
      let index = parseInt(e.detail.value);
      let sexObj = this.data.sexRange[index];
      this.setData({
        'submitData.sexIndex': index,
        'submitData.sex': sexObj.name
      })
    } else if (id == 'birthday') {
      this.setData({
        'submitData.birthday': e.detail.value
      })
    } else if (id == 'committee') {
      let index = parseInt(e.detail.value);
      let committeeObj = this.data.committeeRange[index];
      this.setData({
        'submitData.committeeIndex': index,
        'submitData.committee': committeeObj
      })
    }
  },
  getInfo: function(e) {
    console.log('获取微信基本信息', e.detail.userInfo);
    let name = e.detail.userInfo.nickName;
    let avatarUrl = e.detail.userInfo.avatarUrl;
    let sex = e.detail.userInfo.gender == 2?'女': '男';
    let tempIndex = 0;
    this.data.sexRange.forEach((item,index) => {
      if (item.name == sex) {
        tempIndex = index;
      }
    })
    this.setData({
      'submitData.name': name,
      'submitData.avatarUrl': avatarUrl,
      'submitData.sex': sex,
      'submitData.sexIndex': tempIndex
    })
  },
  getPhone: function(e) {
    console.log('获取微信手机号', e.detail.phone);
    this.setData({
      'submitData.phone': e.detail.phone
    })
  },
  getCommitteeList: function(){
    let $this = this;
    httpManager.getCommitteeList(function(success, data){
      if (success) {
        $this.setData({
          committeeRange: data
        })
      }
    })
  }
})