// pages/journal/journal-list/components/journal-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
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
    operate: function(event) {
      if (event.detail.flag == 'like') { // 点击喜欢
        this.postEvent('like', {
          journalId: this.data.id
        })
      } else if (event.detail.flag == 'comment') { // 点击交流
        this.postEvent('comment', {
          journalId: this.data.id
        })
      }
    },

    postEvent: function(evnetName, eventDetail) {
      this.triggerEvent(evnetName, eventDetail, {});
    }
  }
})
