// components/search-bar/index.js
// 高度 60rpx 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showRightButton: {
      type: Boolean,
      value: true
    },
    rightButtonIconPath: {
      type: String,
      value: '/resources/images/message.png'
    },
    rightButtonTitle: {
      type: String,
      value: ''
    },
    leftInputIconPath: {
      type: String,
      value: '/resources/images/search.png'
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入关键字'
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
    input: function(e) {
      this.triggerEvent('input',{value: e.detail.value},{});
    },
    confirm: function(e) {
      this.triggerEvent('confirm',{value: e.detail.value},{});
    },
    focus: function(e) {
      this.triggerEvent('focus',{value: e.detail.value},{});
    },
    blur: function(e) {
      this.triggerEvent('blur',{value: e.detail.value},{});
    },
    tapRight: function() {
      this.triggerEvent('tapright',{},{})
    }
  }
})
