import {  ApiResponseType, ResultCodesEnum, ResultCodesWithCaptchaEnum, instance } from "./Api"



type MeResponseType={
    id:number,email:string,login:string
  }
  
  type LoginResponseType={  
   userId:number
  }
  
export const authAPI= {
    me(){
      return instance.get<ApiResponseType<MeResponseType>>(`auth/me`).then(res=>res.data)
    },
    login(email:string,password:string,rememberMe:boolean,captcha:null|string){
      return instance.post<ApiResponseType<LoginResponseType,ResultCodesEnum|ResultCodesWithCaptchaEnum>>(`auth/login`,{email,password,rememberMe,captcha}).then(res=>res.data)
    },
    logout(){
      return instance.delete(`auth/login`)
    }
  }
  