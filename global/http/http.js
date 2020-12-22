export const http = async ({
	url,
	data,
	header,
	method = "GET",
	timeout = 3000,
	needFailInfo = false
}) => {
	const reponseData = await new Promise(resolve => {
		let option = {};
		option = {
			url: `http://vvv841.w3.luyouxia.net${url}`,
			method,
			timeout
		};
		if (data) option.data = data;
		if (header) {
			option.header = {
				...option.header,
				...header
			}
		}
		console.log('请求--参数',option);
		wx.request({
      ...option,
      ...{
        successs(data){
          console.log('请求--返回', data)
					const {
						code,
						message,
						success
          } = data;
          if (success) {
            resolve(data);
          } else {
            if (code == 997) {

            } else {
              uni.showLoading({
								title: `状态码：${code}\n${message}`,
								icon: 'none',
							});
							/** 关闭提示信息 */
							setTimeout(() => {
								uni.hideLoading();
							}, 2000);
							if (needFailInfo) {
								resolve(data)
							}
            }
          }
        },
        fail(error){
          console.log('ERROR: http 请求',error);
					uni.showLoading({
						title: `${error.errMsg}`,
						icon: 'none',
					});
					/** 关闭提示信息 */
					setTimeout(() => {
						uni.hideLoading();
					}, 2000);
					if (needFailInfo) {
						resolve({success: false})
					}
        }
      }
		})
	})
	return reponseData;
}