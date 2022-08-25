export {Response} from "node-fetch";

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type Credentials = "omit" | "include" | "same-origin";

export type Mode = "same-origin" | "cors" | "no-cors";

export type AbortResult<T> = {
  promise: Promise<T>;
  abort: () => void;
};

export interface AjaxResult {
  promise: Promise<unknown>;
  config: AjaxConfig;
  controller?: AbortController;
}

export interface RequestConfig {
  url?: string;

  keepalive?: boolean;

  method?: Method;
  baseURL?: string;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  timeoutErrorStatus?: number;
  stoppedErrorMessage?: string;

  ignore?: number[];
}

export interface AjaxExConfig extends RequestConfig {
  query?: string | Record<string, any>;

  isFile?: boolean; // 是否要传递文件
  isNoAlert?: boolean; // 是否要提示错误信息，默认不提示
  isUseOrigin?: boolean; // 为true时，直接返回response，不再处理结果
  isEncodeUrl?: boolean; //get请求时是否要进行浏览器编码
  isOutStop?: boolean;
  /**
   * 主动控制取消请求时可传递此参数，或者直接使用ajaxAbortResult方法。例如：
   *
   *    const controller = new AbortController();
   *    const {signal} = controller;
   */
  signal?: AbortSignal;
  /**
   * 如果是-1，代表不清除缓存
   *
   * 如果是0，代表不使用缓存
   */
  cacheTimeout?: number;

  /* 默认put和post的content-type */
  defaultPutAndPostContentType?: string;
  /* 如果本身是在接口里进行的二次请求，传递原始的headers */
  originHeaders?: Record<string, string | string[]>;
  /* 配合originHeaders使用，如果有这几个字段，将会默认注入 */
  defaultInjectHeaderKeys?: string[];
}

export type Logger = {
  debug(...message: any[]): void;
  info(...message: any[]): void;
  warn(...message: any[]): void;
  error(...message: any[]): void;
}

export type AjaxGetData =
  | string
  | Record<string, string | number | boolean>
  | undefined
  | null;

// deno-lint-ignore ban-types
export type AjaxPostData = object;

export type AjaxData = AjaxGetData | AjaxPostData;

export interface AjaxConfig extends AjaxExConfig {
  url: string;
  method: Method;
  data?: AjaxData;
}

export type RequestCallback = (config: AjaxConfig) => AjaxConfig;

export type ErrorCallback = (error: Error) => Promise<Error>;

export type ResponseCallback = (data: any) => Promise<any>;
