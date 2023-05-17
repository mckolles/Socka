
import { getAuthUserData } from "./authReducer";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
      initialized: false
}

export type InitialStateType = typeof initialState
type ActionsTypes=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionsTypes>

  const appReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
      case 'appReducer/SET-INITIALIZED': 
        return {
            ...state,
            initialized:true
        }

      default:
        return state;
    }
  };
  

  const actions={
    initializedSuccess:()=>({type: 'appReducer/SET-INITIALIZED'}as const)
  }

  export const initializeApp = ():ThunkType =>async(dispatch)=> {  
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
        
  }


  
  export default appReducer;