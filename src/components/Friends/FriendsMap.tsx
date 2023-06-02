import { NavLink } from "react-router-dom";
import s from "../Friends/Friends.module.css";
import {useSelector } from "react-redux";
import { getFollowingInProgres, getfriends } from "../../Redux/friendsSelectors";
import { follow, unfollow } from "../../Redux/friendsReducer";

export const FriendsMap: React.FC = () => {
  const friendsData= useSelector(getfriends)
  const followingInProgres=useSelector(getFollowingInProgres)
  


  return (
    <>
      {friendsData.map((f) => (
        <div key={f.id}>
          <span>
            <div>
              <NavLink to={"/Profile/" + f.id}>
                <img
                  className={s.photo}
                  src={
                    f.photos.small != null
                      ? f.photos.small
                      : "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"
                  }
                  alt=""
                />
              </NavLink>
            </div>
            <div>
              {f.followed ? (
                <button
                  disabled={followingInProgres.some((id) => id === f.id)}
                  className={s.buttons}
                  onClick={() => {
                    unfollow(f.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgres.some((id) => id === f.id)}
                  className={s.buttons}
                  onClick={() => {
                    follow(f.id);
                  }}
                >
                  Follow
                </button>
              )}
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
    </>
  );
};
