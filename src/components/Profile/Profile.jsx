import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./My posts/MyPosts";
import Preloader from "../Common/Preloader/Preloader";
import { Field, reduxForm, } from "redux-form";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { Textarea } from "../Common/Utils/FormControls";
import ProfileStatusWithHooks from "./ProfileInfo/ProfileStatusWithHooks";

const maxLength10=maxLengthCreator(10)

const Profile = (props) => {
  let addPost = (values) => {
    props.addPost(values.newPostText);
  }

  if(!props.profilePage.profile) {
      return <Preloader />
  }
  return (
   
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.img}>
          <img src={props.profilePage.profile.photos.large !=null?props.profilePage.profile.photos.large:
                        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"}
                         alt="" />
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
            <p><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></p>
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
      <div className={s.inputPost} >
        <AddNewPostFormRedux onSubmit={addPost}/>
        <button >Delete post</button>
        </div>
        
      <div className={s.myPosts}>
        <MyPosts posts={props.profilePage.posts} />
      </div>
    </div>
  );
};

const AddNewPostForm=(props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'newPostText'}
          placeholder="Whats new?" validate={[requiredField,maxLength10]}
        />
        <button>Post</button>
     
        </form>
  )
} 

const AddNewPostFormRedux=reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm)

export default Profile;
