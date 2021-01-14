import Request from '../http/request'
import UserManager from './userDataManager'

/**
 * 登录
 * @param {string} code 
 * @param {function(boolean, object)} callback 
 */
function login(code, callback) {
  Request.request({
    url: `api/user/uerLogin?code=${code}`
  },callback)
}

/**
 * 注册
 * @param {object} submitData 
 * @param {function(boolean, object)} callback 
 */
function register(submitData, callback){
  Request.request({
    url: `api/user/uerRegister?uname=${submitData.name}&sex=${submitData.sexIndex}&birthday=${submitData.birthday}&mobile=${submitData.phone}&committeeId=${submitData.committee.cid}&openId=${submitData.openId}`
  }, callback);
}

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
    url: `api/activities/getActList?page=${page}`
  },callback)
}

/**
 * 获取活动详情
 * @param {string} activityId 活动id
 * @param {function(boolean, object)} callback 
 */
function getActivityDetail(activityId, callback) {
  Request.request({
    url: `api/activities/getActById?activityId=${activityId}`
  }, callback)
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
 * 我报名的活动
 * @param {function(boolean, object)} callback 
 */
function getJoinedActivity(callback) {
  Request.request({
    url: `api/activities/listActByUserId?uid=${UserManager.getUserId()}`
  }, callback);
}

/**
 * 取消参加活动
 * @param {string} activityId 活动id
 * @param {function(boolean, object)} callback 
 */
function quitActivity(activityId, callback) {
  Request.request({
    url: `api/activities/cancelActById?activityId=${activityId}&userId=${UserManager.getUserId()}`
  },callback)
}

/**
 * 活动签到
 * @param {string} activityId 活动id
 * @param {function(boolean, object)} callback 
 */
function signActivity(activityId, callback) {
  Request.request({
    url: `api/activities/signActById?activityId=${activityId}&userId=${UserManager.getUserId()}`
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
 * @param {string} keyword 关键字
 * @param {string} committeeId 居委会id
 * @param {string} activityType 活动类型id
 * @param {string} queryCount 人数
 * @param {function(boolean, object)} callback 
 */
function getVenuesList(page, keyword, committeeId, activityType, queryCount, callback) {
  let url = `api/venueinfo/getVenueList?page=${page}`;
  if (keyword) {
    url = `${url}&queryCGName=${keyword}`
  }
  if (committeeId) {
    url = `${url}&queryComId=${committeeId}`
  }
  if (activityType) {
    url = `${url}&queryActType=${activityType}`
  }
  if (queryCount) {
    url = `${url}&queryCount=${queryCount}`
  }
  Request.request({
    url
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
 * @param {object} submitData 提交数据 
 * @param {function(boolean, object)} callback 
 */
function orderVenues(submitData, callback) {
  Request.request({
    url: `api/venueinfo/bookVenueById?userId=${UserManager.getUserId()}&venueId=${submitData.venueId}&bookDate=${submitData.bookDate}&bookTime=${submitData.bookTime}&activityIdName=${submitData.activityIdName}`
  },callback)
}

/**
 * 获取场馆预约状态
 * @param {string} venueId 场馆id
 * @param {function(boolean, object)} callback 
 */
function getVenuesOrderStatus(venueId, callback) {
  Request.request({
    url: `api/venueinfo/getBookStatusList?venueId=${venueId}`
  }, callback)
}

/**
 * 获取用户预约的场馆列表
 */
function getBookedVenuesList(callback){
  Request.request({
    url: `api/venueinfo/queryBookByUserId?uid=${UserManager.getUserId()}`
  }, callback)
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
 * 获取团队详情
 * @param {string} teamId 团队id
 * @param {function(boolean,object)} callback 
 */
function getGroupDetail(teamId, callback) {
  Request.request({
    url: `api/team/getBTeamById?teamId=${teamId}`
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
 * 我参加的团队
 * @param {function(boolean, object)} callback 
 */
function getJoinedGroup(callback) {
  Request.request({
    url: `api/team/listTeamByUserId?uid=${UserManager.getUserId()}`
  },callback);
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

/**
 * 我创建的团队列表
 * @param {function(boolean, object)} callback 
 */
function getCreatedGroup(callback) {
  Request.request({
    url: `api/team/listTeamByCreateUserId?uid=${UserManager.getUserId()}`
  }, callback);
}

/**
 * 更新团队状态
 * @param {string} teamId 团队id
 * @param {string} status 状态
 * @param {function(boolean, object)} callback 
 */
function updateGroupStatus(teamId, status, callback) {
  Request.request({
    url: `api/team/updateTeamStatus?teamId=${teamId}&status=${status}`
  }, callback)
}

/**
 * 申请成为召集人
 * @param {string} activityId 活动类型id
 * @param {string} idCardFontUrl 身份证正面
 * @param {string} idCardBackUrl 身份证反面
 * @param {function(boolean, object)} callback 
 */
function applyConvener(activityId,idCardFontUrl,idCardBackUrl,callback) {
  Request.request({
    url: `api/convenerinfo/applyConvener?userId=${UserManager.getUserId()}&activityId=${activityId}&idcardFrontUrl=${idCardFontUrl}&idcardBackUrl=${idCardBackUrl}`
  }, callback)
}

/**
 * 获取居委会列表
 * @param {function(boolean, object)} callback 
 */
function getCommitteeList(callback){
  Request.request({
    url: `api/committee/getComList`
  }, callback)
}

/**
 * 获取字典
 * @param {string} code 字典code
 * @param {function(boolean, object)} callback 
 */
function getDict(code, callback){
  Request.request({
    url: `api/dic/getDicsByCode?typeCode=${code}`
  }, callback)
}

/**
 * 获取活动类型字典
 * @param {function(boolean, object)} callback 
 */
function getActivityTypeDict(callback){
  this.getDict('activityType', callback);
}

/**
 * 获取用户信息
 * @param {string} userId 用户id
 * @param {function(boolean, object)} callback 
 */
function getUserById(callback) {
  Request.request({
    url: `api/user/getUserById?userId=${UserManager.getUserId()}`
  }, callback)
}

/**
 * 更新用户信息
 * @param {string} userName 用户名称
 * @param {string} sex 性别
 * @param {string} birthday 生日
 * @param {function(boolean, object)} callback 
 */
function updateUser(userName, sex, birthday, callback) {
  Request.request({
    url: `api/user/updateUser?uid=${UserManager.getUserId()}&uname=${userName}&sex=${sex}&birthday=${birthday}`
  }, callback)
}

module.exports = {
  login, // *
  register, // *

  getBannerData, // *
  applyConvener, // *
  getCommitteeList, // *

  getUserById, // *
  updateUser, // *

  getDict, // *
  getActivityTypeDict, // *

  getActivityListData, // *
  getActivityDetail, // *
  quitActivity, // * 失败
  signActivity,
  joinActivity, // *
  getJoinedActivity, // *

  getJournalList, // *

  getVenuesList, // *
  getVenuesDetail, // *
  orderVenues, // 接口报错 未知错误
  getVenuesOrderStatus, // *
  getBookedVenuesList, // *

  getGroupList, // *
  getGroupDetail, // activityTypeDesc 为空
  updateGroupStatus,
  joinGroup, // 接口异常
  createGroup, // *
  getCreatedGroup, // 
  getJoinedGroup, // *
}