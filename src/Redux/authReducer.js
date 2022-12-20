import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../Api/Api";

const setAuthUserDataConst = 'authReducer/SET-AUTH-USER-DATA"'
const toggleIsFetchingConst='authReducer/TOGGLE-IS-FETCHING'
const getCaptchaUrlSucessConst='authReducer/GET-CAPTCHA-URL-SUCCESS'

let initialState = {
      id: null,
      email: null,
      login: null,
      isFetching: true,
      isAuth: false,
      captchaUrl: null

}

  const authReducer = (state = initialState, action) => {

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
  
  export const setAuthUserData= (id,email,login,isAuth) => ({
    type: setAuthUserDataConst,
    payload:{id,email,login,isAuth}
  });

  export const setIsFetching = (isFetching) => ({
    type: toggleIsFetchingConst,
    isFetching
  
  });
  export const getCaptchaUrlSucess = (captchaUrl) => ({
    type: getCaptchaUrlSucessConst,
    payload:{captchaUrl}
  
  });

  export const getAuthUserData = () =>async(dispatch)=> {
   let response=await authAPI.me()
      if(response.data.resultCode === 0){
        let {id,email,login}=response.data.data
        dispatch(setAuthUserData(id,email,login,true))   
        } 
  }

  export const login = (email,password,rememberMe,captcha) =>async(dispatch)=> {
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

  export const logOut = () =>async(dispatch)=> {
    let response=await authAPI.logout()
      if(response.data.resultCode === 0){
        dispatch(setAuthUserData(null,null,null,false))
      }
  }
 
  export const getCaptchaUrl = () =>async(dispatch)=> {
    const response=await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSucess(captchaUrl))
  }
 
  
  export default authReducer;

