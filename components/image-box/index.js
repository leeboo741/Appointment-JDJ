const { checkEmpty, checkIsFunction } = require("../../utils/util");

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
    circle: {
      type: Boolean,
      value: false
    }, // 是否圆形
    ablePreview: {
      type: Boolean,
      value: true
    }, // 是否允许预览图片  如果为false时 会查询ableAdd是否为true 如果ableAdd 会执行新增图片覆盖当前图片
    addButtonBackground: {
      type: String,
      value: ""
    }, // 新增按钮 背景颜色 不传 默认 rgb(250,250,250)
    addButtonTitle: {
      type: String,
      value: '点击添加图片'
    }, // 新增按钮 标题
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
      if (this.data.ablePreview) {
        wx.previewImage({
          urls: this.data.imageList,
          current: res.currentTarget.dataset.url,
          fail(error){
            console.log(error);
          }
        })
      } else {
        if (this.data.ableAdd) {
          let $this = this;
          this.selectImage(1, function(){
            $this.data.imageList = [];
          })
        }
      }
    },
    selectImage:function(count, otherFunc) {
      let $this = this;
      wx.chooseImage({
        count: count,
        success(res) {
          if (checkIsFunction(otherFunc)) {
            otherFunc();
          }
          $this.data.imageList = $this.data.imageList.concat(res.tempFilePaths);
          $this.setData({
            imageList: $this.data.imageList
          })
        }
      })
    },
    tapAdd: function(){
      if (checkEmpty(this.data.imageList)) this.data.imageList = [];
      let count = this.data.maxCount - this.data.imageList.length;
      this.selectImage(count);
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
    let rate = this.data.circle? 1.0 : 1.3;
    var query = wx.createSelectorQuery().in(this) //此处多了in(this)
    query.select(".image-content").boundingClientRect(function(res) {
      console.log(res)
      that.setData({
        height: res.width * rate + 'px'
      })
    }).exec()
  },

})
