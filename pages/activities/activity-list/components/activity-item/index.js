// pages/activities/activity-list/components/activity-item/index.js
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
    tapItem: function() {
      this.triggerEvent('tapitem', {value: this.data.data} , {});
    }
  }
})
