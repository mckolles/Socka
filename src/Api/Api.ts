import axios from "axios"
import { ProfileType } from "../Types/types"

const instance=axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY":"0497f38c-f1aa-42d1-9d11-d5085383ce9c"
      }
})

export const usersAPI= {
    getUsers(currentPage=1,pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response=>{
         return response.data
     })
     },
     followFriendAPI(friendId:number ){  
      return instance.post(`follow/${friendId}`,{})
    },
     unfollowFriendAPI(friendId:number){
            return instance.delete(`follow/${friendId}`)
    },
    getProfile(userId:number){
      console.warn("Obsolete method. Please use `ProfileAPI.getProfile` instead")
      return ProfileAPI.getProfile(userId)
    }
  }

export enum ResultCodesEnum{
  Success=0,
  Error=1,
}

export enum ResultCodesWithCaptchaEnum{
  CapthaIsRequired=10
}

type MeResponseType={
  data:{id:number,email:string,login:string}
  resultCode:ResultCodesEnum|ResultCodesWithCaptchaEnum
  messages:Array<string>
}

type LoginResponseType={
  data:{userId:number}
  resultCode:number
  messages:Array<string>
}

export const authAPI= {
    me(){
      return instance.get<MeResponseType>(`auth/me`).then(res=>res.data)
    },
    login(email:string,password:string,rememberMe:boolean,captcha:null|string){
      return instance.post<LoginResponseType>(`auth/login`,{email,password,rememberMe,captcha}).then(res=>res.data)
    },
    logout(){
      return instance.delete(`auth/login`)
    }
  }

export const ProfileAPI= {
  getProfile(userId:number){
      return  instance.get(`profile/${userId}`)
    },
  getStatus(userId:number){
    return  instance.get(`profile/status/${userId}`)
  },
  updateStatus(status:string){
    return  instance.put(`profile/status`,{status:status})
  },
  savePhoto(photoFile:any){
    const formData=new FormData()
    formData.append('image',photoFile)
    return  instance.put(`profile/photo`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile:ProfileType){
    return  instance.put(`profile`,profile)
  }
  }
  export const securityAPI={
    getCaptchaUrl(){
      return instance.get('security/get-captcha-url')
    }
  }

    

     

