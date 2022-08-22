const { BaseAjax } = require("../dist/index.js");

class Ajax extends BaseAjax {
  /**
   * 处理消息，具体实现可以覆盖此项
   */
   handleMessage(msg) {
    console.log("handleMessage", msg);
    super.handleMessage(msg);
  }

  /**
   * 处理错误请求
   */
   handleErrorResponse(response) {
    console.error(
      `HTTP error, status = ${response.status}, statusText = ${response.statusText}`,
    );
  }
}

// Ajax.defaults.baseURL = "/api";

export const ajax = new Ajax();

ajax.interceptors.request.use(function (mergedConfig) {
  console.log("----request---");
  mergedConfig.headers = mergedConfig.headers || {};
  mergedConfig.headers.token = "abcd";
  return mergedConfig;
}, function (err) {
  return Promise.reject(err);
});

// 响应拦截
ajax.interceptors.response.use(function (data) {
  console.log("----response---");
  // return data.slice(0, 10);
  return data;
}, function (err) {
  return Promise.reject(err);
});

ajax.get('https://www.baidu.com').then(function(response) {
  console.log(response);
})
