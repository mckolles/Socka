
import { getAuthUserData } from "./authReducer";
import { InferActionsTypes } from "./reduxStore";

let initialState = {
      initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType=InferActionsTypes<typeof actions>

  const appReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {

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

  export const initializeApp = () =>(dispatch:any)=> {  
    
    let promise=dispatch(getAuthUserData())
    promise.then(()=>{
      dispatch(actions.initializedSuccess())
    })
        
  }

  
 
  
  export default appReducer;