// pages/venues/components/venues-item-my/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    venues: {
      type: Object,
      value: {}
    }
  },

  observers: {
    'venues': function(venues) {
      console.log('test',venues);
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
    tapItem: function(){
      this.triggerEvent('tapitem', {value: this.data.venues}, {});
    }
  }
})
