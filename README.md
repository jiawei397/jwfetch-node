# 封装的fetch，nodejs使用

## 包含功能点

- 同一时间段重复请求会被缓存过滤掉
- timeout

## 使用

### 封装ajax

```ts
import Ajax from "jwfetch-node";

Ajax.defaults.baseURL = "/api";

export const ajax = new Ajax();
```

### 拦截

```ts
// 请求拦截
ajax.interceptors.request.use(function (mergedConfig) {
  mergedConfig.headers = mergedConfig.headers || {};
  mergedConfig.headers.token = "abcd";
  return mergedConfig;
}, function (err) {
  return Promise.reject(err);
});

// 响应拦截
ajax.interceptors.response.use(function (data) {
  return data.slice(0, 10);
}, function (err) {
  return Promise.reject(err);
});
```

## ajax配置项

### url

Type: `string`

### method

Type: `string`

一般是get、post

### baseURL

Type: `string`

请求url的前缀

### headers

Type: `object`

添加的请求头

### data

Type: `object`

请求数据，一般是个对象{}。

### timeout

Type: `number`

Default: `2 * 60 * 1000`，2分钟

过期时间，单位ms。从请求开始，到这个时间如果接口没有响应，则会返回一个失败的promise。

### timeoutErrorMessage

Type: `string`

Default: `timeout`

过期时间错误提示

### timeoutErrorStatus

Type: `number`

Default: `504`

过期时间状态码

### credentials

Type: `string`

Default: `include`

- omit：忽略cookie的发送
- same-origin: 表示cookie只能同域发送，不能跨域发送
- include: cookie既可以同域发送，也可以跨域发送

### mode

Type: `string`

Default: `cors`

- same-origin：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response
  type为basic。
- cors: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response
  type为cors。
- no-cors: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response
  type为opaque。

### isFile

Type: `boolean`

是否属于文件上传，如果是这样，会根据传递的data，创建一个FormData

### isUseOrigin

Type: `boolean`

为true时，直接返回response，不再处理结果。 一般返回结果不是json对象，比如是流时需要设置此项。

### isEncodeUrl

Type: `boolean`

get请求时是否要进行浏览器编码

### cacheTimeout

Type: `number`

缓存时间

- 如果是-1，代表不清除缓存。
- 如果是0，代表不使用缓存。
- 如果大于0，代表要缓存多长时间，单位是ms。

### originHeaders

Type: `Headers`

如果本身是在接口里进行的二次请求，传递原始的headers

### defaultInjectHeaderKeys

Type: `string[]`

Default:
`["x-request-id", "x-b3-traceid", "x-b3-spanid", "x-b3-parentspanid", "x-b3-sampled"]`

配合originHeaders使用，如果有这几个字段，将会默认注入
