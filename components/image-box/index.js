const { checkEmpty } = require("../../utils/util");

// components/image-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageList: {
      type: Array,
      value: []
    }, // 图片列表
    columnCount: {
      type: Number,
      value: 3
    }, // 列数
    maxCount: {
      type: Number,
      value: 4
    }, // 最大数量
    overMax: {
      type: Boolean,
      value: false
    },
    ableAdd: {
      type: Boolean,
      value: false
    }, // 是否允许新增
    ableDelete: {
      type: Boolean,
      value: false
    }, // 是否允许删除
    ableVideo:{
      type: Boolean,
      value: false
    }, // 是否允许视频
  },

  observers: {
    "imageList":function(imageList) {
      if (checkEmpty(imageList)) {
        this.setData({
          overMax: false
        })
      } else {
        this.setData({
          overMax: imageList.length >= this.data.maxCount
        })
      }
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
    },
    tapAdd: function(){
      if (checkEmpty(this.data.imageList)) this.data.imageList = [];
      let count = this.data.maxCount - this.data.imageList.length;
      let $this = this;
      wx.chooseImage({
        count: count,
        success(res) {
          $this.data.imageList = $this.data.imageList.concat(res.tempFilePaths);
          $this.setData({
            imageList: $this.data.imageList
          })
        }
      })
    },
    tapDelete: function(e){
      let index = e.currentTarget.dataset.index;
      this.data.imageList.splice(index, 1);
      this.setData({
        imageList: this.data.imageList
      })
    },
    requestUploadFile: function(){

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
  },

})
