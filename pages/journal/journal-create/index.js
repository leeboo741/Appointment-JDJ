// pages/journal/journal-create/index.js
import httpManager from '../../../global/manager/httpManager';
const { checkEmpty } = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    committeeRange: [],
    submitData: {
      content: '',
      imageList: [],
      committeeIndex: 0,
      committee:null,
      comId:null,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommitteeList();
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
  changePicker:function(e){
      let index = parseInt(e.detail.value);
      let committeeObj = this.data.committeeRange[index];

      this.setData({
        'submitData.committeeIndex': index,
        'submitData.committee':committeeObj,
        'submitData.comId': committeeObj.cid
      })
  },
   /**
   * 上传图片
   */
  uploadImg:function(e){
    console.log("添加图片",e.detail);
    this.data.submitData.imageList.push(e.detail);
  },
  deleteImge:function(e){
    console.log("删除图片",e.detail);
    let index = e.detail
    this.data.submitData.imageList.splice(index, 1);
  },

  /**
   * 点击确定
   */
  confirm: function(){
    
    let $this = this;
    if(checkEmpty($this.data.submitData.content)){
      wx.showToast({
        title: '请输入想说的话',
        icon:'none'
      })
      return
    }else if(checkEmpty($this.data.submitData.comId)){
      wx.showToast({
        title: '请输入所在地',
        icon:'none'
      })
      return
    }else if(checkEmpty($this.data.submitData.imageList)){
      wx.showToast({
        title: '请上传至少一张图片',
        icon:'none'
      })
      return
    }
    if(this.data.submitData.imageList.length > 0 ){
      this.data.submitData.imageUrl = this.data.submitData.imageList.join(",");
    }
    
    httpManager.sendPhoto($this.data.submitData,function(success,data){
      if(success){
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(function(){
            wx.navigateBack({
            })
          },1000)
      }
    })
  },

  /**
   * 输入
   * @param {any} e 
   */
  input: function(e) {
    let id = e.currentTarget.id;
    if (id == 'content') {
      this.setData({
        'submitData.content': e.detail.value
      })
    }
  },
  getCommitteeList: function(){
    let $this = this;
    httpManager.getCommitteeList(function(success, data){
      if (success) {
        console.log("数据",data);
        $this.setData({
          committeeRange: data
        })
      }
    })
  }
})