import {checkEmpty, checkIsString, throwError, checkIsDict, checkIsNumber, checkIsFunction} from '../../utils/util'

const baseUrl = "https://www.jindingjieorg.cn:9020/"

/**
 * 数据请求
 * @param {obj{url,data,header,method,timeout}} param 请求参数
 * @param {function(success,data/msg)} callback 请求回调 
 */
function request(param, callback) {
  let option = checkAndReturnOption(param)
  console.log('请求参数', option);
  wx.request({
    ...option,
    ...{
      success(res){
        console.log('请求返回', res);
        const {data, header, statusCode, cookies, errMsg} = res;
        if (statusCode != 200) {
          if (checkIsFunction(callback)) {
            callback(false, errMsg);
          }
        } else {
          if (data.code == 1) {
            if (checkIsFunction(callback)) {
              callback(true, data.data);
            }
          } else {
            if (checkIsFunction(callback)) {
              callback(false, data.msg);
            }
          }
        }
      },
      fail(error){
        if (checkIsFunction(callback)) {
          callback(false, error.errMsg);
        }
      }
    }
  })
}

/**
 * 检查参数
 * @param {object} param 
 * @return 返回初始化后参数
 */
function checkAndReturnOption(param) {
  if (checkEmpty(param)) throwError('请求参数不能为空')
  if (!checkIsDict(param)) throwError('请求参数需为object')
  let {url, data, header, method, timeout} = param;
  let option = {};
  if (checkEmpty(url)) throwError('请求地址不能为空')
  if (!checkIsString(url)) throwError('请求地址需为string')
  if (!checkEmpty(method) && !checkIsString(method)) throwError('请求方式需为string')
  if (checkEmpty(method)) {
    method = 'POST';
  } 
  if (!checkEmpty(timeout) && !checkIsNumber(timeout)) throwError('请求超时需为number')
  if (checkEmpty(timeout)) {
    timeout = 3000;
  }
  option = {
    url: `${baseUrl}${url}`,
		method,
    timeout
  }
  if (!checkEmpty(data) && !checkIsDict(data)) throwError('请求表单数据需为object')
  if (!checkEmpty(data)) {
    option.data = data;
  }
  if (!checkEmpty(header) && !checkIsDict(header)) throwError('请求头数据需为object')
  if (!checkEmpty(header)) {
    option.header = {
      ...option.header,
      ...header
    }
  }
  
  return option
}


module.exports={
  request
}