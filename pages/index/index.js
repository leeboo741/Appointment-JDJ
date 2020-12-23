//index.js
import {version, version_code} from '../../global/config.js';
import UserDataManager from '../../global/manager/userDataManager';
import {checkEmpty} from '../../utils/util';
//获取应用实例
const app = getApp()

Page({
  data: {
    version,
    version_code,
    userData: null
  },
  
  onLoad: function () {
    // userData = UserDataManager.queryUserData();
    // if (checkEmpty(userData)) {
    //   // 没有用户数据
    // } else{
    //   // 有用户数据
    // }
    setTimeout(()=>{
      wx.switchTab({
        url: '/pages/home/index',
      })
    }, 0)
  }
  
})
