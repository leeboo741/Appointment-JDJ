// components/push-filter/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_FILTER } from '../../resources/strings/notificationName';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    key: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    notifcationKey: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm: function(){
      this.triggerEvent('confirm',{},{});
      this.close();
    },
    reset: function(){
      this.triggerEvent('reset',{},{});
      this.close();
    },
    tapMask: function(){
      // this.close();
    },
    close: function(){
      NotificationCenter.postNotification(this.data.notifcationKey, false);
    }
  },

  attached: function(){
    this.data.notifcationKey = `${NOTIFICATION_SHOW_FILTER}-${this.data.key}`
    let $this = this;
    NotificationCenter.addNormalNotificationObserver(this.data.notifcationKey, function(show){
      $this.setData({
        show
      })
    }, this);
  },
  detached: function(){
    NotificationCenter.removeNotificationObserver(this);
  },
})
