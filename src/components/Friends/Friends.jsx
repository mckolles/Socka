import * as axios from "axios";
import React from "react";
import s from "../Friends/Friends.module.css"

let Friends = (props) => {

if (props.friendsData.length===0) {
  axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response=>{
    props.setFriends(response.data.items )
  })
 
}

  return (
    <div>
      {props.friendsData.map((f) => (
        <div key={f.id}>
          <span>
            <div>
              <img className={s.photo} src={f.photos.small !=null?f.photos.small:
                "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"} alt="" />
            </div>
            <div>
                {f.followed?<button onClick={()=>{props.unfollow(f.id)}}>Unfollow</button>:
                <button onClick={()=>{props.follow(f.id)}}>Follow</button>}
              
            </div>
          </span>
          <span>
            <span>
              <div>{f.name}</div>
              <div>{f.status}</div>
            </span>
            <span>
              <div>{"f.country"} {"f.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Friends;
