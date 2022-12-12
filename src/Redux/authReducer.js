import { stopSubmit } from "redux-form";
import { authAPI } from "../Api/Api";

const setAuthUserDataConst = 'authReducer/SET-AUTH-USER-DATA"'
const toggleIsFetchingConst='authReducer/TOGGLE-IS-FETCHING'

let initialState = {
      id: null,
      email: null,
      login: null,
      isFetching: true,
      isAuth: false

}

  const authReducer = (state = initialState, action) => {

    switch (action.type) {
      case setAuthUserDataConst: 
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

  export const getAuthUserData = () =>async(dispatch)=> {
   let response=await authAPI.me()
      if(response.data.resultCode === 0){
        let {id,email,login}=response.data.data
        dispatch(setAuthUserData(id,email,login,true))   
        } 
  }

  export const login = (email,password,rememberMe) =>async(dispatch)=> {
    let response=await authAPI.login(email,password,rememberMe)
      if(response.data.resultCode === 0){
        dispatch(getAuthUserData())
      }
      else {
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
 
  
  export default authReducer;

