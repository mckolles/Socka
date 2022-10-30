
import { combineReducers, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:diologsReducer,
    friendsPage:friendsReducer,
    auth:authReducer,
})
let store=createStore(reducers)

window.store=store







export default store