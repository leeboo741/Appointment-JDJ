// pages/groups/group-list/components/group-item/index.js
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
    tapJoin: function(e) {
      if (e.currentTarget.dataset.able == 'true') {
        this.triggerEvent('join', {value: this.data.data}, {});
      } else {
        wx.showToast({
          title: '该团队已满员',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})
