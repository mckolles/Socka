import React from "react";
import classes from "./Posts.module.css";
const Post = () => {
  return (
    <div className={classes.profile}>
      {" "}
      <div className={classes.mainImg}>
        {" "}
        <img src="" alt=""></img>{" "}
      </div>{" "}
      <div>Ava+description</div>{" "}
      <div>
        {" "}
        My posts <div>New post</div>{" "}
      </div>{" "}
      <div>
        {" "}
        posts <div>post1</div> <div>post2</div>{" "}
      </div>{" "}
    </div>
  );
};
export default Post;
