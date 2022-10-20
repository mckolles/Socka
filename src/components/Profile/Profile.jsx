import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./My posts/MyPosts";
import Preloader from "../Common/Preloader/Preloader";

const Profile = (props) => {
  let addPost = (e) => {
    props.addPost();
  };

  let updatePost = (e) => {
    let message = e.target.value;
    props.updatePost(message);
  };

  if(!props.profilePage.profile) {
      return <Preloader />
  }
  return (
   
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.img}>
          <img src={props.profilePage.profile.photos.large} alt="avatar" />
        </div>
      </div>
      <div className={s.description}>
        <div className={s.descriptionEl}>
          <div className={s.descriptionH1}>
            <h1>{props.profilePage.profile.fullName}</h1>
            <hr className={s.hrShelf} />
          </div>
          <div className={s.data}>
            <p>Status:</p>
          </div>
          <div className={s.dataAnswer}>
            <p>{props.profilePage.profile.aboutMe}</p>
          </div>

          <div className={s.data}>
            <p>VK:</p>
          </div>
          <div className={s.dataAnswer}>
            <a href={props.profilePage.profile.contacts.vk}>{props.profilePage.profile.contacts.vk}</a>
          </div>
          <div className={s.data}>
            <p>Instagramm:</p>
          </div>
          <div className={s.dataAnswer}>
            <a href={props.profilePage.profile.contacts.instagram}>{props.profilePage.profile.contacts.instagram}</a>
          </div>
        </div>
      </div>
      <div className={s.inputPost} onCopy={addPost}>
        <textarea
          value={props.profilePage.valueProfileInput}
          type="text"
          onChange={updatePost}
          placeholder="Whats new?"
        />
      </div>
      <div className={s.myPosts}>
        <MyPosts posts={props.profilePage.posts} />
      </div>
    </div>
  );
};
export default Profile;
