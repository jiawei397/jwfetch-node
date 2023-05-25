const { Ajax } = require("../dist/index.js");
// import Ajax from "../dist/index.mjs";

const ajax = new Ajax();

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

ajax.get('https://www.baidu.com').then(function (response) {
  console.log(response);
})
