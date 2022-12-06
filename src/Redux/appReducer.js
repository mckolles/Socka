import { getAuthUserData } from "./authReducer";

let initialState = {
      initialized: false,
      

}

  const appReducer = (state = initialState, action) => {

    switch (action.type) {
      case "SET-INITIALIZED": 
        return {
            ...state,
            initialized:true
        }

      default:
        return state;
    }
  };
  
  export const initializedSuccess= () => ({
    type: "SET-INITIALIZED"
  });

  export const setIsFetching = (isFetching) => ({
    type: "TOGGLE-IS-FETCHING",
    isFetching
  
  });

  export const initializeApp = () =>(dispatch)=> {
    
    let promise=dispatch(getAuthUserData())
    promise.then(()=>{
      dispatch(initializedSuccess())
    })
        
  }

  
 
  
  export default appReducer;

