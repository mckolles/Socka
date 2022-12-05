
import { applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'


let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:diologsReducer,
    friendsPage:friendsReducer,
    auth:authReducer,
    form:formReducer
})
let store=createStore(reducers,applyMiddleware(thunkMiddleware))

window.store=store







export default store