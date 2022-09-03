import React from "react";
import s from "./MyPosts.module.css";
import AvatarProfile from "./profile-avatar.jpg";

const MyPosts = () => {
  return (
    <div className={s.postsWrapper}>
      <div className={s.ava}>
        <img src={AvatarProfile} alt="ava" />
        <div className={s.authorName}>
          <p>Kolesnikov Nikita</p>
        </div>
      </div>
      <div className={s.text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a
          atque incidunt impedit est. Cumque dolorem minus consequuntur eius ut
          aliquid saepe, deserunt perferendis consectetur officiis, veritatis
          possimus quod laborum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a
          atque incidunt impedit est. Cumque dolorem minus consequuntur eius ut
          aliquid saepe, deserunt perferendis consectetur officiis, veritatis
          possimus quod laborum?
        </p>
      </div>
      <div className={s.images}>
        <img src="https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album" alt="" />
      </div>
    </div>
    
  );
};
export default MyPosts;
