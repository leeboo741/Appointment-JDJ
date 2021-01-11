import Request from '../http/request'
import UserManager from './userDataManager'

/**
 * 获取banner
 * @param {number} type 0 首页 1 随拍
 * @param {function(boolean, object)} callback 
 */
function getBannerData(type, callback) {
  Request.request({
    url: `api/banner/getBannerList?type=${type}`
  },callback)
}

/**
 * 获取活动列表
 * @param {number} page 页码
 * @param {function(boolean, object)} callback 
 */
function getActivityListData(page, callback) {
  Request.request({
    url: `api/activities/getActList?page=1`
  },callback)
}

/**
 * 参加活动
 * @param {string} activityId 活动id
 * @param {function(boolean, object)} callback 
 */
function joinActivity(activityId, callback) {
  Request.request({
    url:`api/activities/entryActById?activityId=${activityId}&userId=${UserManager.getUserId()}`
  },callback)
}

/**
 * 获取随拍列表
 * @param {number} page 页数
 * @param {function(boolean, object)} callback 
 */
function getJournalList(page, callback) {
  Request.request({
    url: `api/photoinfo/getPhotoList?page=${page}`
  },callback)
}

/**
 * 获取场馆列表
 * @param {number} page 页数
 * @param {function(boolean, object)} callback 
 */
function getVenuesList(page, callback) {
  Request.request({
    url: `api/venueinfo/getVenueList?page=${page}`
  },callback)
}

/**
 * 获取场馆详情
 * @param {string} venueId 场馆id
 * @param {function(boolean, object)} callback 
 */
function getVenuesDetail(venueId, callback) {
  Request.request({
    url: `api/venueinfo/getVenueById?venueId=${venueId}`
  }, callback);
}

/**
 * 预约场馆
 * @param {string} venueId 场馆id
 * @param {string} bookDate 预约日期
 * @param {string} bookTime 预约时间
 * @param {string} activityName 活动名称 
 * @param {function(boolean, object)} callback 
 */
function orderVenues(venueId, bookDate, bookTime, activityName, callback) {
  Request.request({
    url: `api/venueinfo/bookVenueById?userId=${UserManager.getUserId()}&venueId=${venueId}& bookDate=${bookDate}&bookTime=${bookTime}&activityIdName=${activityName}`
  },callback)
}

/**
 * 获取团队列表
 * @param {number} page 页数
 * @param {function(boolean,object)} callback 
 */
function getGroupList(page, callback) {
  Request.request({
    url: `api/team/getTeamList?page=${page}`
  }, callback)
}

/**
 * 加入团队
 * @param {string} teamId 团队id
 * @param {function(boolean, object)} callback 
 */
function joinGroup(teamId, callback) {
  Request.request({
    url: `api/team/entryTeamById?teamId=${teamId}&userId=${UserManager.getUserId()}`
  },callback)
}

/**
 * 创建团队
 * @param {object} submitData 表单数据
 * @param {function(boolean, object)} callback 
 */
function createGroup(submitData, callback){
  Request.request({
    url: `api/team/buildTeam?tname=${submitData.tname}&peopleCount=${submitData.peopleCount}&activityType=${submitData.activityType}&activityContent=${submitData.activityContent}&enterCondition=${submitData.enterCondition}`
  }, callback)
}

module.exports = {
  getBannerData,

  getActivityListData,
  joinActivity,

  getJournalList,

  getVenuesList,
  getVenuesDetail,
  orderVenues,

  getGroupList,
  joinGroup,
  createGroup
}