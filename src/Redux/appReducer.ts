
import { getAuthUserData } from "./authReducer";

const setInitializedConst='appReducer/SET-INITIALIZED'

export type InitialStateType = {
  initialized: boolean,
}

let initialState:InitialStateType = {
      initialized: false,
}


  const appReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {

    switch (action.type) {
      case setInitializedConst: 
        return {
            ...state,
            initialized:true
        }

      default:
        return state;
    }
  };
  
  type InitializedSuccessActionType={
    type: typeof setInitializedConst
  }

  export const initializedSuccess= ():InitializedSuccessActionType => ({
    type: setInitializedConst
  });

  export const initializeApp = () =>(dispatch:any)=> {
    
    let promise=dispatch(getAuthUserData())
    promise.then(()=>{
      dispatch(initializedSuccess())
    })
        
  }

  
 
  
  export default appReducer;