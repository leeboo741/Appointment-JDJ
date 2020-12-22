const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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

module.exports = {
  formatTime: formatTime,
  checkEmpty
}
