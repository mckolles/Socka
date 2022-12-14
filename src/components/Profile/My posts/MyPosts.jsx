import React from "react";
import s from "./MyPosts.module.css";

const MyPost =React.memo ((props) => {
  return (
    <div className={s.postsWrapper}>
      <div className={s.ava}>
        <img src={props.avaSrc} alt="1"></img>
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

const MyPosts = React.memo((props) => {
  
  let postsComponent = props.posts.map((p) => (
    <MyPost avaSrc={p.avasrc} name={p.name} text={p.text} image={p.image} key={p.id} />
  ));
  if(props.posts.length === 0) {
    return <div className={s.empty}>No posts yet!</div>
  }
  else return <div> {!props.onFriendPage?postsComponent:<div className={s.empty}>No posts yet!</div>}</div>;

})

export default MyPosts;
