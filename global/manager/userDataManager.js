import NotificationCenter from "../notificationCenter.js";
import {NOTIFICATION_CHANGE_USER_DATA, NOTIFICATION_SHOW_LOGIN} from "../../resources/strings/notificationName.js";
import {checkEmpty} from '../../utils/util';
const Storage_Key_UserData = 'userDataStorageKey'
/**
 * 删除用户信息
 * @return 成功/失败 true/false
 */
function deleteUserData() {
  try {
    wx.removeStorageSync(Storage_Key_UserData);
    NotificationCenter.postNotification(NOTIFICATION_CHANGE_USER_DATA, null);
  } catch (error) {
    console.log('error:删除本地用户信息', error)
  }
}
/**
 * 保存、更新用户信息
 * @param {object} userData 用户信息 
 * @return 成功/失败 true/false
 */
function updateUserData(userData) {
  try {
    wx.setStorageSync(Storage_Key_UserData, userData)
    NotificationCenter.postNotification(NOTIFICATION_CHANGE_USER_DATA, userData);
  } catch (error) {
    console.log('error:保存/更新本地用户信息', error)
  }
}
/**
 * 获取用户信息
 * @param {object} observer 监听者 监听 userData 数据变化 传入当前页面 如果传入数据 需要在 unload 方法中移除监听
 * @param {function} callback 监听回调 处理 userData 变化
 * @return userData
 */
function queryUserData(observer, callback) {
  try {
    const userData = wx.getStorageSync(Storage_Key_UserData)
    if (!checkEmpty(observer)) {
      NotificationCenter.addNormalNotificationObserver(NOTIFICATION_CHANGE_USER_DATA, callback, observer);
    }
    return userData;
  } catch (error) {
    console.log('error:获取本地用户信息', error)
  }
}

/**
 * 移除 用户数据变化监听
 * @param {*} observer 监听者
 */
function removeUserDataChangeObserver(observer) {
  NotificationCenter.removeNotificationObserver(NOTIFICATION_CHANGE_USER_DATA, observer);
}

/**
 * 需要登录的功能 弹窗提示登录
 */
function showNeedLoginAlert() {
  NotificationCenter.postNotification(NOTIFICATION_SHOW_LOGIN, true);
}

module.exports = {
  deleteUserData,
  updateUserData,
  queryUserData,
  removeUserDataChangeObserver,
  showNeedLoginAlert
}