// components/push-filter/filter-section/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: 'tag-single' // tag-single 单选项 tag-multi 多选项 time-zone 时间区间 count-zone 数字区间
    },
    title: {
      type: String,
      value: ""
    }, // 标题
    tagsData: {
      type: Array,
      value: []
    }, // 标签数据 tag-single / tag-multi 生效
    selectedTag: {
      type: Array,
      value: []
    }, // 选中的标签 tag-single / tag-multi 生效
    key: {
      type: String,
      value: 'name'
    }, // 显示的字段名
    startDate: {
      type: String,
      value: ''
    }, // 开始时间
    endDate: {
      type: String,
      value: ''
    }, // 结束时间
    startCount: {
      type: Number,
      value: null
    }, // 开始数量
    endCount: {
      type: Number,
      value: null
    } // 结束数量
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

  }
})
