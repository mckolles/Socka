let initialState = {
  posts: [
    {
      avasrc:
        "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
      name: "Kolesnikov NIkita",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing",
      image:
        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
    },
    {
      avasrc:
        "https://sun9-67.userapi.com/impg/lFrjc-CpVikro_MvVi_fl2_EYWHo0KNk06RZCg/Nf_Fj25fixc.jpg?size=1595x2160&quality=95&sign=ce8e008645a499d84503d3a9dea82e17&type=album",
      name: "Kolesnikov NIkita",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing",
      image:
        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
    },
    {
      avasrc: "http://1c-uroki.ru/sites/default/files/arhitect.png",
      name: "Koles NIkita",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing",
      image:
        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
    },
  ],
  valueProfileInput: "",
};

const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case "ADD-POST":
      state.posts.push({
        avasrc:
          "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
        name: "Koles NIkita",
        text: state.valueProfileInput,
        image:
          "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      });
      state.valueProfileInput = "";
      return state;
    case "UPDATE-POST":
      state.valueProfileInput = action.post;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = (message) => ({ type: "ADD-POST" });
export const updatePostActionCreator = (message) => ({
  type: "UPDATE-POST",
  post: message,
});
export default profileReducer;
