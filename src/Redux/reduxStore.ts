
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer";

type RootReducerType= typeof rootReducer
export type AppStateType=ReturnType<RootReducerType>

type PropertiesTypes<T>=T extends {[key:string]:infer U}?U:never

export type InferActionsTypes<T extends {[key:string]:(...args:any[])=>any}> =ReturnType<PropertiesTypes<T>>

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