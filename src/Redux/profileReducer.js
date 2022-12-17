import { ProfileAPI, usersAPI } from "../Api/Api";

const addPostConst='profileReducer/ADD-POST'
const setUserProfileConst='profileReducer/SET-USER-PROFILE"'
const setStatusConst='profileReducer/SET-STATUS'
const deletePostConst='profileReducer/DELETE-POST'
const savePhotoConst='profileReducer/SAVE-PHOTO-SUCCESS'

let initialState = {
  posts: [
    {
      avasrc:
        "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
      name: "Kolesnikov NIkita",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing",
      image:
        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      id: "1",
    },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case addPostConst: {
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            avasrc:
              "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
          name: "Koles NIkita" ,
          text: action.message ,
          
            image:
              "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
          id: "2" 
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
    default:
      return state;
  }
};

export const addPost = (message) => ({ type: addPostConst, message });
export const setProfile = (profile) => ({ type: setUserProfileConst, profile });
export const setStatus = (status) => ({ type: setStatusConst, status });
export const deletePost = (postID) => ({ type: deletePostConst, postID });
export const savePhotoSuccess = (photos) => ({ type: savePhotoConst, photos });


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

export default profileReducer;
