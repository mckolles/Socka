import axios from "axios"
import { FriendsDataType } from "../Types/types"

export const instance=axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY":"0497f38c-f1aa-42d1-9d11-d5085383ce9c"
      }
})

export type ApiResponseType<D={},RC=ResultCodesEnum>={
  data:D,
  messages:Array<string>,
  resultCode:RC

}

export enum ResultCodesEnum{
  Success=0,
  Error=1,
}

export enum ResultCodesWithCaptchaEnum{
  CapthaIsRequired=10
}


 export type GetItemstype ={
  items:Array<FriendsDataType>,
  totalCount:number,
  error:string|null
 }

    

     

