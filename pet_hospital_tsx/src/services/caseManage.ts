import {get,post,patch,del} from '../utils/request'

export const loadDataAPI = (query:any ={}) => get('/case/get',query);//返回所有病例文字数据数据

export const loadDataByNameAPI = (name:string) => get('/case/get/name='+name);//根据病例名称返回纯文字数据的病例数组

export const loadDataByIdAPI = (id:string) => get(`/case/get/id=${id}`);//返回单个病例全部数据

export const updateByIdAPI =(id:string,data:any) =>post('/admin/case/edit/'+id,data);//更新单个病例的全部信息

export const delByIdAPI =(id:string) =>post('/admin/case/delete/'+id);//删除单个病例

export const insertAllAPI =(data:any) =>post('/admin/case/add',data);//插入单个病例的全部信息

export const insertAPI =(data:any) =>post('/api/data',data);

export const loadRoomDataByIdAPI = () => get('');//返回单个科室全部数据

export const loadRoomDataAPI = () => get('/department/get');//返回单个科室全部数据

export const updateRoomByIdAPI =(id:string,data:any) => post('/admin/department/edit/'+id,data);//更新单个科室的全部信息

// export const insertRoomAPI =(data:any) =>post('/api/data/room',data);//插入单个科室的全部信息