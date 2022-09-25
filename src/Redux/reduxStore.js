
import { combineReducers, legacy_createStore as createStore} from "redux";    
import diologsReducer from "./diologsReducer";
import profileReducer from "./profileReducer";

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogsPage:diologsReducer
})
let store=createStore(reducers)







export default store