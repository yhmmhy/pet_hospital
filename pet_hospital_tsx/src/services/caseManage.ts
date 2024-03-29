import {get,post,patch,del} from '../utils/request'

export const loadDataAPI = (query:any ={}) => get('/api/data',query);//返回所有病例文字数据数据

export const loadDataByNameAPI = (name:string) => get('/api/data/'+name);//根据病例名称返回纯文字数据的病例数组

export const loadDataByIdAPI = (id:string) => get('/api/data/'+id);//返回单个病例全部数据

export const updateByIdAPI =(id:string,data:any) => patch('/api/data/'+id,data);//更新单个病例的全部信息

export const delByIdAPI =(id:string) =>del('api/data/'+id);//删除单个病例

export const insertAllAPI =(data:any) =>post('/api/data/all',data);//插入单个病例的全部信息

export const insertAPI =(data:any) =>post('/api/data',data);

export const loadRoomDataByIdAPI = (id:string) => get('/api/data/room/'+id);//返回单个科室全部数据

export const updateRoomByIdAPI =(id:string,data:any) => patch('/api/data/room/'+id,data);//更新单个科室的全部信息

export const insertRoomAPI =(data:any) =>post('/api/data/room',data);//插入单个科室的全部信息