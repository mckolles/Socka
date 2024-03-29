
import { Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer";
import { ThunkAction } from "redux-thunk";

type RootReducerType= typeof rootReducer
export type AppStateType=ReturnType<RootReducerType>
export type InferActionsTypes<T>=T extends {[key:string]:(...args:any[])=>infer U}?U:never
export type BaseThunkType<A extends Action,R=Promise<void>>=ThunkAction<R,AppStateType,unknown,A>

let rootReducer=combineReducers({
    profilePage:profileReducer,
    dialogsPage:diologsReducer,
    friendsPage:friendsReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
})

//@ts-ignore
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store=createStore(rootReducer,composeEnhancers (applyMiddleware(thunkMiddleware)))


export default store