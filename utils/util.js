const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 检查是否为空
 * @param {any} obj 
 * @return true空/false非空
 */
function checkEmpty(obj) {
  if (obj == null || obj==undefined) {
    return true;
  }
  if ((typeof obj == 'string' || obj instanceof Array) && obj.length <= 0) {
    return true;
  } 
  if (typeof obj == 'object' && Object.keys(obj).length <= 0) {
    return true;
  }
  return false;
}

/**
 * 检查是否是字符春
 * @param {any} str 
 * 
 * @return true是/false否
 */
function checkIsString(str) {
  if (str == null || str == undefined) {
    return false;
  }
  return typeof str == 'string';
}

/**
 * 检查是否是数组
 * @param {any} arr
 * @return true是/false否 
 */
function checkIsArray(arr) {
  if (arr == null || arr == undefined) {
    return false;
  }
  return arr instanceof Array;
}

/**
 * 检查是否是字典
 * @param {any} dict
 * @return true是/false否 
 */
function checkIsDict(dict) {
  if (dict == null || dict == undefined) {
    return false;
  }
  return typeof dict == 'object' && !(dict instanceof Array)
}

/**
 * 检查是否是布尔值
 * @param {any} bol
 * @return true是/false否 
 */
function checkIsBoolean(bol){
  if (bol == null || bol == undefined) {
    return false;
  }
  return typeof bol == 'boolean'
}

/**
 * 检查是否是数字
 * @param {any} num
 * @return true是/false否 
 */
function checkIsNumber(num) {
  if (num == null || num == undefined) {
    return false;
  }
  return typeof num == 'number'
}

/**
 * 检查是否是函数
 * @param {any} fuc 
 * @return true是/false否 
 */
function checkIsFunction(fuc) {
  if (fuc == null || fuc == undefined) {
    return false;
  }
  return typeof fuc == 'function';
}

/**
 * 抛出错误
 * @param {string} msg 
 */
function throwError(msg) {
  throw new Error(msg);
}

module.exports = {
  formatTime: formatTime,
  checkEmpty,
  checkIsArray,
  checkIsDict,
  checkIsBoolean,
  checkIsNumber,
  checkIsString,
  checkIsFunction,
  throwError
}
