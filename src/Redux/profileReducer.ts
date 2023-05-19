import { PhotosType } from './../Types/types';
import { stopSubmit } from "redux-form";
import { PostType, ProfileType } from "../Types/types";
import { ProfileAPI } from '../Api/ProfileApi';
import { BaseThunkType, InferActionsTypes } from './reduxStore';


let initialState = {
  posts: [] as Array<PostType>,
  profile: null as ProfileType|null,
  status: "" ,    
  moreInfoMod:false as boolean
};

let idTextNumber=0

const profileReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'profileReducer/ADD-POST': {
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
    case 'profileReducer/SET-USER-PROFILE"': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'profileReducer/SET-STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'profileReducer/DELETE-POST': {
      return {...state,posts:state.posts.filter(p=>p.id !==action.postID)}
    }
    case 'profileReducer/SAVE-PHOTO-SUCCESS': {
      
      return {...state, profile:{...state.profile,photos:action.photos }as ProfileType}
  }
    case 'profileReducer/SET-MORE-INFO-MOD': {
      return {...state, moreInfoMod:action.boolean}
  }
    default:
      return state;
  }
};

export const actions={
  addPost:(message:string) => ({ type: 'profileReducer/ADD-POST', message } as const),
  setProfile:(profile:ProfileType) => ({ type: 'profileReducer/SET-USER-PROFILE"', profile } as const),
  setStatus:(status:string) => ({ type: 'profileReducer/SET-STATUS', status } as const),
  deletePost:(postID:number) => ({ type: 'profileReducer/DELETE-POST', postID } as const),
  savePhotoSuccess:(photos:PhotosType) => ({ type: 'profileReducer/SAVE-PHOTO-SUCCESS', photos }) as const,
  moreInfoMod:(boolean:boolean) => ({ type: 'profileReducer/SET-MORE-INFO-MOD', boolean } as const)
}


export const getProfile = (userId:number):ThunkType =>async (dispatch) => {
  let data=await ProfileAPI.getProfile(userId)
    dispatch(actions.setProfile(data));
};
export const getStatus = (userId:number):ThunkType => async(dispatch) => {
  let data=await ProfileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));

};
export const updateStatus = (status:string):ThunkType => async(dispatch) => {
  let data=await ProfileAPI.updateStatus(status)
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
};
export const savePhoto = (file:File):ThunkType => async(dispatch) => {
 
  let data=await ProfileAPI.savePhoto(file)
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
      alert('Are you shure?')
    }
};
export const saveProfile = (profile:ProfileType):ThunkType => async(dispatch,getState) => {
  const userId=getState().auth.id 
  const data=await ProfileAPI.saveProfile(profile,)
    if (data.resultCode === 0) {
      if(userId!=null){
        dispatch(getProfile(userId));
    }
      else{
        throw new Error('userId cant be null')
    }
  }
    else{
        dispatch(stopSubmit("EditProfile",{_error:data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
    
};


type InitialStateType=typeof initialState
type ActionsTypes=InferActionsTypes<typeof actions >
export type ThunkType=BaseThunkType<ActionsTypes|ReturnType<typeof stopSubmit>>

export default profileReducer;
