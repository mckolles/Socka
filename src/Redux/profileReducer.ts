import { PhotosType } from './../Types/types';
import { stopSubmit } from "redux-form";
import { PostType, ProfileType } from "../Types/types";
import { ProfileAPI } from '../Api/ProfileApi';

const addPostConst='profileReducer/ADD-POST'
const setUserProfileConst='profileReducer/SET-USER-PROFILE"'
const setStatusConst='profileReducer/SET-STATUS'
const deletePostConst='profileReducer/DELETE-POST'
const savePhotoConst='profileReducer/SAVE-PHOTO-SUCCESS'
const setMoreInfoModConst='profileReducer/SET-MORE-INFO-MOD'


let initialState = {
  posts: [] as Array<PostType>,
  profile: null as ProfileType|null,
  status: "" ,    
  moreInfoMod:false as boolean
};
type InitialStateType=typeof initialState
let idTextNumber=0

const profileReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case addPostConst: {
      idTextNumber++
      let newPost=
        { 
          avasrc:(state.profile?.photos.small)?state.profile?.photos.small:null,
          name: (state.profile?.fullName)?state.profile?.fullName:null,
          text: action.message ,
          image:
              "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
          id: idTextNumber
        } 
      
      return {
        ...state,posts: 
        [...state.posts,newPost]   
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
      
      return {...state, profile:{...state.profile,photos:action.photos }as ProfileType}
  }
    case setMoreInfoModConst: {
      return {...state, moreInfoMod:action.boolean}
  }
    default:
      return state;
  }
};

type AddPostType={
  type:typeof addPostConst,
  message:string
}
type SetProfileType={
  type:typeof setUserProfileConst,
  profile:ProfileType
}
type SetStatusType={
  type:typeof setStatusConst,
  status:string
}
type DeletePostType={
  type:typeof deletePostConst,
  postID:number
}
type SavePhotoSuccessType={
  type:typeof savePhotoConst,
  photos:PhotosType
}
type MoreInfoModType={
  type:typeof setMoreInfoModConst,
  boolean:boolean
}
export const addPost = (message:string):AddPostType => ({ type: addPostConst, message });
export const setProfile = (profile:ProfileType):SetProfileType => ({ type: setUserProfileConst, profile });
export const setStatus = (status:string):SetStatusType => ({ type: setStatusConst, status });
export const deletePost = (postID:number):DeletePostType => ({ type: deletePostConst, postID });
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessType => ({ type: savePhotoConst, photos });
export const moreInfoMod = (boolean:boolean):MoreInfoModType => ({ type: setMoreInfoModConst, boolean });


export const getProfile = (userId:number) =>async (dispatch:any) => {
  let data=await ProfileAPI.getProfile(userId)
    dispatch(setProfile(data));
};
export const getStatus = (userId:number) => async(dispatch:any) => {
  let data=await ProfileAPI.getStatus(userId)
    dispatch(setStatus(data));

};
export const updateStatus = (status:string) => async(dispatch:any) => {
  let data=await ProfileAPI.updateStatus(status)
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
};
export const savePhoto = (file:any) => async(dispatch:any) => {
 
  let data=await ProfileAPI.savePhoto(file)
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
      alert('Are you shure?')
    }
};
export const saveProfile = (profile:ProfileType) => async(dispatch:any,getState:any) => {
  const userId=getState().auth.id 
  const data=await ProfileAPI.saveProfile(profile,)
    if (data.resultCode === 0) {
      dispatch(getProfile(userId));
    }
    else{
        dispatch(stopSubmit("EditProfile",{_error:data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
    
};

export default profileReducer;
