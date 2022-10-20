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
    }
  ],
  valueProfileInput: "",
  profile:null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-POST": {
      return{
        ...state,
        valueProfileInput: "",
        posts: [
          ...state.posts,
          {
            avasrc:
              "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
            name: "Koles NIkita",
            text: state.valueProfileInput,
            image:
              "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
            id: "7",
          },
        ],
      };
    }
    case "UPDATE-POST": {
      return{ 
        ...state,
        valueProfileInput:action.post
      };
    }
    case "SET-USER-PROFILE": {
      return{ 
        ...state,
       profile:action.profile
      };
    }
    default:
      return state;
  }
};

export const addPost = (message) => ({ type: "ADD-POST" });
export const updatePost = (message) => ({
  type: "UPDATE-POST",
  post: message,
});
export const setUserProfile = (profile) => ({ type: "SET-USER-PROFILE",profile });
export default profileReducer;
