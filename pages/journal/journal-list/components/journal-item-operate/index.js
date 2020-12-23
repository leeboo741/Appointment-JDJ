// pages/journal/journal-list/components/journal-item-operate/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: {
      type: String,
      value: ''
    },
    count: {
      type: Number,
      value: 0
    },
    iconPath: {
      type: String,
      value: ""
    },
    disabled: {
      type: Boolean,
      value: false
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
    tap: function(){
      if (!this.data.disabled) {
        var eventDetail = {flag: this.data.flag} // detail对象，提供给事件监听函数
        this.triggerEvent('operate', eventDetail, {})
      }
    }
  }
})
