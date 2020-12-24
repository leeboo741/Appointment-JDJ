// components/push-authorize-userinfo/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_GETUSERINFO} from '../../resources/strings/notificationName';
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
    getUserInfo: function(info) {
      this.triggerEvent('getinfo',{userInfo: info.detail.userInfo},{});
      NotificationCenter.postNotification(NOTIFICATION_SHOW_GETUSERINFO, false);
    },
    cancel: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_GETUSERINFO, false);
    },
  },

  attached: function(){
    let $this = this;
    NotificationCenter.addNormalNotificationObserver(NOTIFICATION_SHOW_GETUSERINFO, function(show){
      console.log('监听',show)
      $this.setData({
        show
      })
    }, this);
  },
  detached: function(){
    NotificationCenter.removeNotificationObserver(this);
  }
})
