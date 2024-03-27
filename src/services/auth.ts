import {post} from '../utils/request'

type LoginData={
    userName:string;
    password:string;
}

/**
 * 
 * @param data 
 * @returns 
 */
export const loginAPI=(data:LoginData) =>post('',data);