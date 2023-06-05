
import { ResultCodesWithCaptchaEnum } from './../Api/Api';
import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../Api/Api";
import { authAPI } from '../Api/AuthApi';
import { securityAPI } from '../Api/SecuirityApi';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

let initialState:InitialStateType = {
  id: null,
  email: null,
  login: null,
  isFetching: true,
  isAuth: false,
  captchaUrl: null

}



  const authReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
      case 'authReducer/SET-AUTH-USER-DATA':
      case 'authReducer/GET-CAPTCHA-URL-SUCCESS':
        return {
            ...state,
        ...action.payload
        }

      case 'authReducer/TOGGLE-IS-FETCHING': 
        return {...state,isFetching:action.isFetching}

      default:
        return state;
    }
  };

  export const actions={
    setAuthUserData: (id:number|null,email:string|null,login:string|null,isAuth:boolean) => ({
      type: 'authReducer/SET-AUTH-USER-DATA',
      payload:{id,email,login,isAuth}
    }as const),
    getCaptchaUrlSucess:(captchaUrl:string) => ({
      type:'authReducer/GET-CAPTCHA-URL-SUCCESS' ,
      payload:{captchaUrl}  
    }as const),
    setIsFetching:(isFetching:boolean) => ({
      type: 'authReducer/TOGGLE-IS-FETCHING',
      isFetching}as const)
  }
 


  export const getAuthUserData = ():ThunkType =>async(dispatch)=> {
   let meData=await authAPI.me()
      if(meData.resultCode === ResultCodesEnum.Success){
        let {id,email,login}=meData.data
        dispatch(actions.setAuthUserData(id,email,login,true))   
        } 
  }

  export const login = (email:string,password:string,rememberMe:boolean,captcha:null|string):ThunkType =>async(dispatch)=> {
    let loginData=await authAPI.login(email,password,rememberMe,captcha)
      if(loginData.resultCode === ResultCodesEnum.Success){
        dispatch(getAuthUserData())
      }
      else  {
        if(loginData.resultCode===ResultCodesWithCaptchaEnum.CapthaIsRequired){
          dispatch(setCaptchaUrl())
        }
        let message=loginData.messages.length>0?loginData.messages[0]:"Something went wrong"
        dispatch(stopSubmit("Login",{_error:message}))
      }
  }

  export const logOut = ():ThunkType =>async(dispatch)=> {
    let response=await authAPI.logout()
      if(response.data.resultCode === 0){
        dispatch(actions.setAuthUserData(null,null,null,false))
      }
  }
 
  export const setCaptchaUrl = ():ThunkType =>async(dispatch)=> {
    const data=await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSucess(captchaUrl))
  }
 
  export type InitialStateType = {
    id: number|null,
    email: null|string,
    login: null|string,
    isFetching: boolean,
    isAuth: boolean,
    captchaUrl: null|string

}

type ActionsTypes=InferActionsTypes<typeof actions >
type ThunkType=BaseThunkType<ActionsTypes|ReturnType<typeof stopSubmit>>
  
  export default authReducer;

