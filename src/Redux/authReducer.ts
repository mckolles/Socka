
import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../Api/Api";

const setAuthUserDataConst = 'authReducer/SET-AUTH-USER-DATA"'
const toggleIsFetchingConst='authReducer/TOGGLE-IS-FETCHING'
const getCaptchaUrlSucessConst='authReducer/GET-CAPTCHA-URL-SUCCESS'


export type InitialStateType = {
      id: number|null,
      email: null|string,
      login: null|string,
      isFetching: boolean,
      isAuth: boolean,
      captchaUrl: null|string

}
let initialState:InitialStateType = {
      id: null,
      email: null,
      login: null,
      isFetching: true,
      isAuth: false,
      captchaUrl: null

}


  const authReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {

    switch (action.type) {
      case setAuthUserDataConst:
      case getCaptchaUrlSucessConst:
        return {
            ...state,
        ...action.payload
        }

      case toggleIsFetchingConst: 
        return {...state,isFetching:action.isFetching}

      default:
        return state;
    }
  };
  
  type SetAuthUserDataActionPayloadType={
    id:number|null,
    email:string|null,
    login:string|null,
    isAuth:boolean
  }
  type SetAuthUserDataActionType={
    type:typeof setAuthUserDataConst,
    payload:SetAuthUserDataActionPayloadType
  }

  export const setAuthUserData= (id:number|null,email:string|null,login:string|null,isAuth:boolean):SetAuthUserDataActionType => ({
    type: setAuthUserDataConst,
    payload:{id,email,login,isAuth}
  });
  type SetIsFetchingType={
    type:typeof toggleIsFetchingConst,
    isFetching:boolean
  }
  export const setIsFetching = (isFetching:boolean):SetIsFetchingType => ({
    type: toggleIsFetchingConst,
    isFetching
  
  });
  type getCaptchaUrlSucessType={
    type: typeof getCaptchaUrlSucessConst,
    payload:{captchaUrl:string}
  }
  export const getCaptchaUrlSucess = (captchaUrl:string):getCaptchaUrlSucessType => ({
    type: getCaptchaUrlSucessConst,
    payload:{captchaUrl}
  
  });

  export const getAuthUserData = () =>async(dispatch:any)=> {
   let response=await authAPI.me()
      if(response.data.resultCode === 0){
        let {id,email,login}=response.data.data
        dispatch(setAuthUserData(id,email,login,true))   
        } 
  }

  export const login = (email:string,password:string,rememberMe:boolean,captcha:null) =>async(dispatch:any)=> {
    let response=await authAPI.login(email,password,rememberMe,captcha)
      if(response.data.resultCode === 0){
        dispatch(getAuthUserData())
      }
      else  {
        if(response.data.resultCode===10){
          dispatch(getCaptchaUrl())
        }
        let message=response.data.messages.length>0?response.data.messages[0]:"Something went wrong"
        dispatch(stopSubmit("Login",{_error:message}))
      }
  }

  export const logOut = () =>async(dispatch:any)=> {
    let response=await authAPI.logout()
      if(response.data.resultCode === 0){
        dispatch(setAuthUserData(null,null,null,false))
      }
  }
 
  export const getCaptchaUrl = () =>async(dispatch:any)=> {
    const response=await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSucess(captchaUrl))
  }
 
  
  export default authReducer;

