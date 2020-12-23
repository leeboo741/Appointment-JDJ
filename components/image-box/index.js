// components/image-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageList: {
      type: Array,
      value: []
    },
    columnCount: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '30px'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapPreview: function(res) {
      console.log(res);
      wx.previewImage({
        urls: this.data.imageList,
        current: res.currentTarget.dataset.url,
        fail(error){
          console.log(error);
        }
      })
    }
  },

  ready:function() {
    var that = this
    var query = wx.createSelectorQuery().in(this) //此处多了in(this)
    query.select(".image-content").boundingClientRect(function(res) {
      console.log(res)
      that.setData({
        height: res.width * 1.3 + 'px'
      })
    }).exec()
}
})