import { stopSubmit } from "redux-form";
import { authAPI } from "../Api/Api";

let initialState = {
      id: null,
      email: null,
      login: null,
      isFetching: true,
      isAuth: false

}

  const authReducer = (state = initialState, action) => {

    switch (action.type) {
      case "SET-AUTH-USER-DATA": 
        return {
            ...state,
        ...action.payload
        }
      
      case "TOGGLE-IS-FETCHING": 
        return {...state,isFetching:action.isFetching}

      default:
        return state;
    }
  };
  
  export const setAuthUserData= (id,email,login,isAuth) => ({
    type: "SET-AUTH-USER-DATA",
    payload:{id,email,login,isAuth}
  });

  export const setIsFetching = (isFetching) => ({
    type: "TOGGLE-IS-FETCHING",
    isFetching
  
  });

  export const getAuthUserData = () =>(dispatch)=> {
   return authAPI.me()
    .then(response=>{
      if(response.data.resultCode === 0){
        let {id,email,login}=response.data.data
        dispatch(setAuthUserData(id,email,login,true))
      }
        })
  }

  export const login = (email,password,rememberMe) =>(dispatch)=> {
    return authAPI.login(email,password,rememberMe)
      .then(response=>{
      if(response.data.resultCode === 0){
        dispatch(getAuthUserData())
      }
      else {
        let message=response.data.messages.length>0?response.data.messages[0]:"Something went wrong"
        dispatch(stopSubmit("Login",{_error:message}))
      }
        })
  }

  export const logOut = () =>(dispatch)=> {
   return authAPI.logout()
    .then(response=>{
      if(response.data.resultCode === 0){
        dispatch(getAuthUserData(null,null,null,false))
      }
        })
  }
 
  
  export default authReducer;

