import React from "react";
import s from "../Friends/Friends.module.css"

let Friends = (props) => {

if (props.friendsData.length===0) {
  props.setFriends( [
    { name: "Sveta", surname:"Katsura",status:"Im so pretty", id: "1", followed: true,country:"Russia", city:"Moscow",
  photo:"https://sun9-82.userapi.com/impg/_IR7TlTg0mSFc5y6Hmw9waxwqweYk6J5n0zGcw/c0_BS8tWqMM.jpg?size=1619x2160&quality=95&sign=94924cb59294fbc87516f0ad87ef4d44&type=album" },
    { name: "Sergey", surname:"Zavyalov",status:"Im god", id: "2", followed: true,country:"Russia", city:"Moscow",
  photo:"https://sun9-4.userapi.com/impg/XxAEGM0dfml7S5Wrx4db81HLNG2paP5Fws4L9Q/qltSXZYRrHo.jpg?size=1536x2048&quality=96&sign=25c846045269603f1c0196e438cacae3&type=album" },
    { name: "Vova", surname:"Tsar",status:"Im tsar", id: "3", followed: true,country:"Russia", city:"Moscow",
  photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Alexis_I_of_Russia_%28Hermitage%29.jpg/200px-Alexis_I_of_Russia_%28Hermitage%29.jpg"}
  ])
}

  return (
    <div>
      {props.friendsData.map((f) => (
        <div key={f.id}>
          <span>
            <div>
              <img className={s.photo} src={f.photo} alt="" />
            </div>
            <div>
                {f.followed?<button onClick={()=>{props.unfollow(f.id)}}>Unfollow</button>:
                <button onClick={()=>{props.follow(f.id)}}>Follow</button>}
              
            </div>
          </span>
          <span>
            <span>
              <div>{f.name} {f.surname}</div>
              <div>{f.status}</div>
            </span>
            <span>
              <div>{f.country} {f.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Friends;
