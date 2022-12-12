import { getAuthUserData } from "./authReducer";

const setInitializedConst='appReducer/SET-INITIALIZED'


let initialState = {
      initialized: false,
      

}

  const appReducer = (state = initialState, action) => {

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
  
  export const initializedSuccess= () => ({
    type: setInitializedConst
  });

  export const initializeApp = () =>(dispatch)=> {
    
    let promise=dispatch(getAuthUserData())
    promise.then(()=>{
      dispatch(initializedSuccess())
    })
        
  }

  
 
  
  export default appReducer;

