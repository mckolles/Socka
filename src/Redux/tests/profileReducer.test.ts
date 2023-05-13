
import profileReducer, { actions } from "../profileReducer";

let state = {
  posts: [
    {
      avasrc:
        "https://sun1-86.userapi.com/impg/e0H7e8Mn1PDNrgQFfmCejlHTpuvbfOzrFKfc6w/rsNoB_wMy1o.jpg?size=1317x2160&quality=95&sign=ec024126a5cb967fd03817bb98707f03&type=album",
      name: "Kolesnikov NIkita",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing",
      image:
        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album",
      id: 1,
    },
  ],
  profile: null,
  status: "" ,    
  moreInfoMod:false as boolean
};

let actionAdd = actions.addPost("asdadada");
let actionDelete = actions.deletePost(1);



test("Length posts should be incremented", () => {
let newState = profileReducer(state, actionAdd)
  expect(newState.posts.length).toBe(3);
});

test("Text should be correct", () => {
  let newState = profileReducer(state, actionAdd)
  expect(newState.posts[1].text).toBe("asdadada");

});
test("Post must be deleted", () => {
  let newState = profileReducer(state, actionDelete)
  expect(newState.posts.length).toBe(1);

});

