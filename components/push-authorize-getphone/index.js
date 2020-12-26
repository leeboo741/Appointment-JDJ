// components/push-authorize-getphone/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_GETPHONE} from '../../resources/strings/notificationName';
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
    getPhone: function(e) {
      console.log('获取手机号加密信息',e.detail.encryptedData, e.detail.iv);
      // 发起请求 前往后台解密 加密信息， 返回手机号，对外抛出手机号，并关闭弹窗
      this.triggerEvent('getphone',{value: e.detail, phone: '16607093121'}, {});
      NotificationCenter.postNotification(NOTIFICATION_SHOW_GETPHONE, false);
    },
    cancel: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_GETPHONE, false);
    },
  },

  attached: function(){
    let $this = this;
    NotificationCenter.addNormalNotificationObserver(NOTIFICATION_SHOW_GETPHONE, function(show){
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
      NotificationCenter.postNotification(NOTIFICATION_SHOW_GETPHONE, false);
    }
  }
})
