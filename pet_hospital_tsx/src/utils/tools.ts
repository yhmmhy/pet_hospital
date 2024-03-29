export const serverUrl ='http://localhost:3000';

export const setToken =(token:string)=> sessionStorage.setItem('token',token)

export const getToken = ()=> sessionStorage.getItem('token')