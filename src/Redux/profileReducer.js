import { stopSubmit } from "redux-form";
import { ProfileAPI, usersAPI } from "../Api/Api";

const addPostConst='profileReducer/ADD-POST'
const setUserProfileConst='profileReducer/SET-USER-PROFILE"'
const setStatusConst='profileReducer/SET-STATUS'
const deletePostConst='profileReducer/DELETE-POST'
const savePhotoConst='profileReducer/SAVE-PHOTO-SUCCESS'
const setMoreInfoModConst='profileReducer/SET-MORE-INFO-MOD'


let initialState = {
  posts: [],
  profile: null,
  status: "",
  moreInfoMod:false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case addPostConst: {
      let id=1
      id++
      return {
        ...state,
        posts: [
          ...state.posts,
          {avasrc:state.profile.photos.small,
          name: state.profile.fullName ,
          text: action.message ,
          image:
              "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
          id: id
        }
        ],
      };
    }
    case setUserProfileConst: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case setStatusConst: {
      return {
        ...state,
        status: action.status,
      };
    }
    case deletePostConst: {
      return {...state,posts:state.posts.filter(p=>p.id !==action.postID)}
    }
    case savePhotoConst: {
      
      return {...state, profile:{...state.profile,photos:action.photos }}
  }
    case setMoreInfoModConst: {
      return {...state, moreInfoMod:action.boolean}
  }
    default:
      return state;
  }
};

export const addPost = (message) => ({ type: addPostConst, message });
export const setProfile = (profile) => ({ type: setUserProfileConst, profile });
export const setStatus = (status) => ({ type: setStatusConst, status });
export const deletePost = (postID) => ({ type: deletePostConst, postID });
export const savePhotoSuccess = (photos) => ({ type: savePhotoConst, photos });
export const moreInfoMod = (boolean) => ({ type: setMoreInfoModConst, boolean });


export const getProfile = (userId) =>async (dispatch) => {
  let response=await usersAPI.getProfile(userId)
    dispatch(setProfile(response.data));
};
export const getStatus = (userId) => async(dispatch) => {
  let response=await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

};
export const updateStatus = (status) => async(dispatch) => {
  let response=await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
};
export const savePhoto = (file) => async(dispatch) => {
 
  let response=await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
      alert('Are you shure?')
    }
};
export const saveProfile = (profile) => async(dispatch,getState) => {
  const userId=getState().auth.id 
  const response=await ProfileAPI.saveProfile(profile,)
    if (response.data.resultCode === 0) {
      dispatch(getProfile(userId));
    }
    else{
        dispatch(stopSubmit("EditProfile",{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
    
};

export default profileReducer;
