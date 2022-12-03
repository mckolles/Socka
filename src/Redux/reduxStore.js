
import { applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:diologsReducer,
    friendsPage:friendsReducer,
    auth:authReducer,
})
let store=createStore(reducers,applyMiddleware(thunkMiddleware))

window.store=store







export default store