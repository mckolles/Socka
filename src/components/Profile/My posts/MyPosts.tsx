import React from "react";
import s from "./MyPosts.module.css";
import { PostType } from "../../../Types/types";


type MyPostMapStatePropsType={
  avaSrc:string|null,
  name:string|null,
  text:string,
  image:string
}




type MyPostPropsType=MyPostMapStatePropsType

const MyPost:React.FC<MyPostPropsType> =React.memo ((props) => {
  const avaSrc = props.avaSrc !== null ? props.avaSrc : undefined;
  
  return (
    <div className={s.postsWrapper}>
      <div className={s.ava}>
        <img src={avaSrc} alt="1"></img>
        <div className={s.authorName}>
          <p>{props.name}</p>
        </div>
      </div>
      <div className={s.text}>
        <p>{props.text}</p>
      </div>
      <div className={s.images}>
        <img src={props.image} alt="1" />
      </div>
    </div>
  );
})

type MapStatePropsTypeMyPosts={
  posts:Array<PostType>,
  onFriendPage:boolean
}


type PropsTypeMyPosts=MapStatePropsTypeMyPosts

const MyPosts:React.FC<PropsTypeMyPosts> = React.memo((props) => {
  
  let postsComponent = props.posts.map((p) => (
    <MyPost avaSrc={p.avasrc} name={p.name} text={p.text} image={p.image} key={p.id} />
  ));
  if(props.posts.length === 0) {
    return <div className={s.empty}>No posts yet!</div>
  }
  else return <div> {!props.onFriendPage?postsComponent:<div className={s.empty}>No posts yet!</div>}</div>;

})

export default MyPosts;
