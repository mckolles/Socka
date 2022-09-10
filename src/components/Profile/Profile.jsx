import React from "react";
import s from "./Profile.module.css";
import AvatarProfile from "./profile-avatar.jpg";
import MyPosts from "./My posts/MyPosts";
import { addPost } from "../../state";
import { rerenderEntireTree } from "../..";



const Profile = (props) => {
let refTextarea=React.createRef()
let listnertextarea=()=>{
  let a=refTextarea.current.value
  addPost(a)
  rerenderEntireTree() 
}



  return (
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.img}>
          <img src={AvatarProfile} alt="avatar" />
        </div>
        </div>
        <div className={s.description}>
          <div className={s.descriptionEl}>
          <div className={s.descriptionH1}>
            <h1>Kolesnikov Nikita</h1>
            <hr  className={s.hrShelf}/>
          </div>
          <div className={s.data}>
          <p>Birth Date:</p>
          </div>
          <div className={s.dataAnswer}>
            <p>04/03/1998</p>
            </div>
        
            <div className={s.data}>
          <p>City:</p>
          </div>
          <div className={s.dataAnswer}>
            <p>Moscow</p>
          </div>
          <div className={s.data}>
          <p>Instagramm:</p>
          </div>
          <div className={s.dataAnswer}> 
            <p>nikitakoles</p>
          </div>
          </div>
        </div>
        <div className={s.inputPost} onCopy={listnertextarea}>
          <textarea ref={refTextarea} placeholder="Whats new?"  type="text"  />
        </div>
        <div className={s.myPosts}>
        <MyPosts profilePage={props.profilePage} />
        </div>  
      
    </div>
  );
};
export default Profile;
