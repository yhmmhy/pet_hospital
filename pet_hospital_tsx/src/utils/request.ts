import axios from 'axios'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, serverUrl } from './tools'

const instance =axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    withCredentials: true
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //@ts-ignore
    config.headers.token = getToken();
    NProgress.start();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return Promise.reject(error);
  });

export const get =(url: string,params:any={}) =>instance.get(url,{params}).then((res)=>res.data);
export const post =(url: string,data:any={}) =>instance.post(url,data).then((res)=>res.data);
export const put =(url: string,data:any={}) =>instance.put(url,data).then((res)=>res.data);
export const patch =(url: string,data:any={}) =>instance.patch(url,data).then((res)=>res.data);
export const del =(url:string) => instance.delete(url).then((res)=>res.data);