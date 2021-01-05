const { formatTime } = require("../../../../../utils/util")

// pages/venues/venues-detail/components/venues-schedule/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedSection: null,
    selectedRow: null,
    currentDate: "请选择要预约的时间", // 当前时间
    colorList: [
      {
        state: 1,
        name: '已选择',
        color: '#FF7603'
      },
      {
        state: 2,
        name: '不可选',
        color: '#ee2c2c'
      },
      {
        state: 3,
        name: '可选',
        color: '#dfdfdf'
      },
      {
        state: 4,
        name: '已预约',
        color: '#FEC500'
      },
    ]
  },

  observers: {
    'selectedSection, selectedRow': function(selectedSection, selectedRow) {
      let date = this.data.data[selectedSection].date;
      let time = this.data.data[selectedSection].list[selectedRow].time;
      let state = this.data.data[selectedSection].list[selectedRow].state;
      if (state == 3) {
        this.setData({
          currentDate: `${date} ${time}`
        })
      } else if (state == 1) {
        this.setData({
          currentDate: `${date} ${time} (已选择)`
        })
      } else if (state == 2) {
        this.setData({
          currentDate: `${date} ${time} (不可选)`
        })
      } else if (state == 4) {
        this.setData({
          currentDate: `${date} ${time} (已预约)`
        })
      }
      this.triggerEvent('tapschedule',{date, time, state}, {});
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapItem: function(e) {
      this.setData({
        selectedSection: parseInt(e.currentTarget.dataset.section),
        selectedRow: parseInt(e.currentTarget.dataset.row)
      })
    }
  }
})
