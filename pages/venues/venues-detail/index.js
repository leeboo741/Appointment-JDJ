// pages/venues/venues-detail/index.js
import Request from "../../../global/http/request";
import { checkIsFunction } from "../../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueId: null,
    venuesDetail: {},
    selectedDate: '2020.12.28',
    selectedTime: '09:00',
    scheduleData: [
      {
        date: "2020.01.01",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.02",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.03",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.04",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.05",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.06",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
      {
        date: "2020.01.07",
        list: [
          {
            time: "08:00-10:00",
            state: 1,
          },
          {
            time: "10:00-12:00",
            state: 2,
          },
          {
            time: "14:00-16:00",
            state: 3,
          },
          {
            time: "16:00-18:00",
            state: 3,
          },
          {
            time: "18:00-20:00",
            state: 4,
          },
          {
            time: "20:00-22:00",
            state: 3
          }
        ],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.venueId = options.id;
    let $this = this;
    this.requestData(this.data.venueId, function(success, data) {
      if (success) {
        $this.setData({
          venuesDetail: data
        })
      } else {
        wx.showToast({
          title: data,
          icon: 'none'
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 场馆详情数据请求
   * @param {string} venueId 场馆id
   * @param {function(success, object)} callback 回调函数
   */
  requestData: function(venueId, callback){
    Request.request({
      url: 'getVenueById',
      data: {
        venueId
      }
    }, function(success, data){
      if (checkIsFunction(callback)) {
        callback(success, data);
      }
    })
  },

  /**
   * 点击预约
   */
  tapOrder: function(){
    console.log('点击预约', this.data.venuesDetail);
    const app = getApp();
    app.globalData.orderVenues = this.data.venuesDetail;
    wx.navigateTo({
      url: `/pages/venues/venues-appointment/index?id=${this.data.venuesDetail.venueId}&date=${this.data.selectedDate}&time=${this.data.selectedTime}`,
    })
  },

  /**
   * 点击排期
   * @param {any} e 
   */
  tapSchedule: function(e) {
    console.log('点击排期', e.detail.date, e.detail.time, e.detail.state);
  }
})