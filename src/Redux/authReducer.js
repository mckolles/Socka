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
        ...action.data,
        isAuth: true
        }
      
      case "TOGGLE-IS-FETCHING": 
        return {...state,isFetching:action.isFetching}

      default:
        return state;
    }
  };
  
  export const setAuthUserData= (id,email,login) => ({
    type: "SET-AUTH-USER-DATA",
    data:{id,email,login}
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
        dispatch(setAuthUserData(id,email,login))
      }
        })
  }
 
  
  export default authReducer;

