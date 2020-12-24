// components/push-comment/index.js
import NotificationCenter from '../../global/notificationCenter';
import {NOTIFICATION_SHOW_COMMENT} from '../../resources/strings/notificationName';
import request from '../../global/http/request';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }, // 展示控制
    data: {
      type: Object,
      value: {}
    }, // 评论关联数据
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentList: [], // 评论数据
    inputComment: "", // 输入的评论
  },

  observers: {
    'show': function(show){
      if (show) {
        wx.hideTabBar({
          animation: false,
        })
      } else {
        wx.showTabBar({
          animation: false,
        })
      }
    },
    'data': function(data){
      if (data.id != this.data.data.id) {
        this.setData({
          inputComment: '',
          commentList: []
        })
        // 发起数据请求, 请求评论列表
      } 
    }
  },

  attached: function(){
    let $this = this;
    NotificationCenter.addNormalNotificationObserver(NOTIFICATION_SHOW_COMMENT, function(show){
      $this.setData({
        show
      })
    }, this);
  },

  detached: function(){
    NotificationCenter.removeNotificationObserver(this);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    input: function(e) {
      this.data.inputComment = e.detail.value;
    },
    confirm: function(){
      console.log('添加评论', this.data.inputComment);
    },
    close: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_COMMENT, false);
    },
    tapMask: function(){
      NotificationCenter.postNotification(NOTIFICATION_SHOW_COMMENT, false);
    }
  }
})
