export const serverUrl ='http://47.102.142.153:5000';

export const setToken =(token:string)=> sessionStorage.setItem('token',token)

export const getToken = ()=> sessionStorage.getItem('token')