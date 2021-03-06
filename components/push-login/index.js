// components/push-login/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_LOGIN} from '../../resources/strings/notificationName';
import request from '../../global/http/request';
import httpManager from '../../global/manager/httpManager';
import { checkEmpty } from '../../utils/util';
import UserDataManager from '../../global/manager/userDataManager'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },
  data:{
    userInfo:null
  },

  observers: {
    "show": function(show) {
      if (show) {
        wx.hideTabBar({
          animation: false,
        })
      } else {
        wx.showTabBar({
          animation: false,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    login: function(e){
      //先获取用户信息
      if (e.detail.userInfo) {
        var that = this;
        console.log("用户的信息如下：");
        console.log(e.detail.userInfo);
        that.setData({
          userInfo: e.detail.userInfo
        });

        let $this = this;
        wx.login({
          success(res) {
            if (res.code) {
              // 获取微信code 
              // 发起请求 查询 后台openid, 后台通过 openid 查询是否有对应用户, 有用户 返回用户信息, 无用户 返回未注册信息
              // 返回用户信息 保存用户信息 
              // 返回未注册信息 跳转注册页面
              // 关闭登录页面
              $this.requestLogin(res.code);
            }
          },
          fail(error) {
            wx.showToast({
              title: error.errMsg,
              icon: 'none'
            })
          }
        })
    } else {

    }
    },
    cancel: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
    },
    requestLogin: function(wxCode) {
      let $this = this;
      httpManager.login(wxCode, function(success, data){
        if (success){
          if (!checkEmpty(data)) {
            NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
            if (checkEmpty(data.uid)) {
              wx.navigateTo({
                url: `/pages/register/index?openid=${data.openId}`,
              })
            } else {
              data.headImg = $this.data.userInfo.avatarUrl
              UserDataManager.updateUserData(data);
            }
          } else {
            wx.showToast({
              title: '登录接口错误',
              icon: 'none'
            })
          }
        }
      })
      // NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
      // wx.navigateTo({
      //   url: `/pages/register/index?code=${wxCode}`,
      // })
    }
  },
  attached: function(){
    let $this = this;
    NotificationCenter.addNormalNotificationObserver(NOTIFICATION_SHOW_LOGIN, function(show){
      $this.setData({
        show
      })
    }, this);
  },
  detached: function(){
    NotificationCenter.removeNotificationObserver(this);
  },
  pageLifetimes: {
    hide: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
    }
  }
})
