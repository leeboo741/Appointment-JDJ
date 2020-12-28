// components/push-filter/filter-section/index.js

import {checkEmpty} from '../../../utils/util';

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
    tags: {
      type: Array,
      value: []
    }, // 标签数据 tag-single / tag-multi 生效
    selectedTags: {
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
      type: String,
      value: ''
    }, // 开始数量
    endCount: {
      type: String,
      value: ''
    } // 结束数量
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  observers: {
    'selectedTags': function(selectedTags) {
      let tempList = [];
      this.data.tags.forEach((item,index) => {
        let selected = false;
        for (let i = 0; i < selectedTags.length; i++){
          let selectedItem = selectedTags[i];
          if (selectedItem.id == item.id) {
            selected = true;
            break;
          }
        }
        item.selected = selected;
        tempList.push(item);
      })
      this.setData({
        tags: tempList
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapTag: function(event){
      let index = parseInt(event.currentTarget.dataset.index);
      let tempTag = event.currentTarget.dataset.obj;
      if (this.data.mode == 'tag-single') {
        if (checkEmpty(this.data.selectedTags)) {
          this.data.selectedTags.push(tempTag);
        } else {
          if (tempTag.id == this.data.selectedTags[0].id) {
            this.data.selectedTags = [];
          } else {
            this.data.selectedTags = [];
            this.data.selectedTags.push(tempTag);
          }
        }
      } else if (this.data.mode == 'tag-multi') {
        if (checkEmpty(this.data.selectedTags)) {
          this.data.selectedTags.push(tempTag);
        } else {
          let tempIndex = -1;
          for (let i = 0; i < this.data.selectedTags.length; i++) {
            let selectedTag = this.data.selectedTags[i];
            if (selectedTag.id == tempTag.id) {
              tempIndex = i;
              break;
            }
          }
          if (tempIndex != -1) {
            this.data.selectedTags.splice(tempIndex, 1);
          } else {
            this.data.selectedTags.push(tempTag);
          }
        }
      }
      this.triggerEvent('selectedtag',{
        value: this.data.selectedTags
      }, {})
    },
    changeDate: function(event) {
      console.log('选择时间', event);
      if (event.currentTarget.id == 'start') {
        this.setData({
          'startDate': event.detail.value
        })
      } else if (event.currentTarget.id == 'end') {
        this.setData({
          'endDate': event.detail.value
        })
      }
      this.triggerEvent('changedate', {
        startDate: this.data.startDate,
        endDate: this.data.endDate
      }, {});
    },
    inputCount: function(event) {
      console.log('输入数量', event) 
      if (event.currentTarget.id == 'start') {
        this.setData({
          'startCount': event.detail.value
        })
      } else if (event.currentTarget.id == 'end') {
        this.setData({
          'endCount': event.detail.value
        })
      }
      this.triggerEvent('inputcount', {
        startCount: this.data.startCount,
        endCount: this.data.endCount
      }, {});
    }
  }
})
