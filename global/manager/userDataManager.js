import NotificationCenter from "../notificationCenter.js";
import {NOTIFICATION_CHANGE_USER_DATA} from "../../resources/strings/notificationName.js";

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
 * @return userData
 */
function getUserData() {
  try {
    const userData = wx.getStorageSync(Storage_Key_UserData)
    return userData;
  } catch (error) {
    console.log('error:获取本地用户信息', error)
  }
}

module.exports = {
  deleteUserData,
  updateUserData,
  getUserData
}