// pages/venues/venues-detail/components/venues-schedule/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentDate: "", // 当前时间
    colorList: [
      {
        id: 1,
        name: '已选择',
        color: '#FF7603'
      },
      {
        id: 2,
        name: '不可选',
        color: '#ee2c2c'
      },
      {
        id: 3,
        name: '可选',
        color: '#dfdfdf'
      },
      {
        id: 4,
        name: '已预约',
        color: '#FEC500'
      },
    ],
    timeList: [
      {
        id: 1,
        time: "09:00"
      },
      {
        id: 2,
        time: "12:00"
      },
      {
        id: 3,
        time: "14:00"
      },
      {
        id: 4,
        time: "16:00"
      },
      {
        id: 5,
        time: "18:00"
      },
      {
        id: 6,
        time: "20:00"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
