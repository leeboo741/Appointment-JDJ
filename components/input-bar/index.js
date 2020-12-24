// components/input-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputValue: {
      type: String,
      value: ''
    },
    placeholderText: {
      type: String,
      value: '请输入关键字'
    },
    inputType: {
      type: String,
      value: "text"
    },
    backgroundColor: {
      type: String,
      value: "#ededed"
    },
    placeholderColor: {
      type: String,
      value: "#999999"
    },
    textColor: {
      type: String,
      value: '#000000'
    },
    iconPath: {
      type: String,
      value: '/resources/images/search.png'
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
    input: function(e){
      this.triggerEvent('input',{value: e.detail.value},{});
    },
    focus: function(e) {
      this.triggerEvent('focus',{value: e.detail.value},{});
    },
    confirm: function(e) {
      this.triggerEvent('confirm',{value: e.detail.value},{});
    },
    blur: function(e){
      this.triggerEvent('blur',{value: e.detail.value},{});
    }
  }
})
