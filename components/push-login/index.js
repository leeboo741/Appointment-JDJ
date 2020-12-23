// components/push-login/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_LOGIN} from '../../resources/strings/notificationName';
import request from '../../global/http/request';
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
    login: function(){
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
            title: '微信登录失败',
            icon: 'none'
          })
        }
      })
    },
    cancel: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
    },
    requestLogin: function(wxCode) {
      request.request();
      NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, false);
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
  }
})
