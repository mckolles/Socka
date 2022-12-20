import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./My posts/MyPosts";
import Preloader from "../Common/Preloader/Preloader";
import { Field, reduxForm, } from "redux-form";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { Textarea } from "../Common/Utils/FormControls";
import ProfileStatusWithHooks from "./ProfileInfo/ProfileStatusWithHooks";
import { ExtendedProfile } from "./ProfileInfo/ExtendedProfile";

const maxLength10=maxLengthCreator(10)

const Profile = (props) => {
  let addPost = (values) => {
    props.addPost(values.newPostText);
  }
 
  let myProfile=!props.match.params.userId
  let moreInfoModBoolean=props.profilePage.moreInfoMod
  if(!props.profilePage.profile) {
      return <Preloader />
  }
  const onMainPhotoSelected=(e) => {
    if(e.target.files.length){
      props.savePhoto(e.target.files[0])
    }
  }
  
  return (
   <>
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.img}>
          <img src={props.profilePage.profile.photos.large !=null?props.profilePage.profile.photos.large:
                        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"}
                         alt="" />
        </div>
       {myProfile&&<input type='file' onChange={onMainPhotoSelected}></input>}
      </div>
     {!moreInfoModBoolean&&<div className={s.description}>
        <div className={s.descriptionEl}>
          <div className={s.descriptionH1}>
            <h1>{props.profilePage.profile.fullName}</h1>
            <hr className={s.hrShelf} />
          </div>
          <div className={s.data}>
            <p>Status:</p>
          </div>
          <div className={s.dataAnswer}>
           {myProfile?<p><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></p>:
           <p></p>}
          </div>
          <div className={s.data}>
            <p>VK:</p>
          </div>
          <div className={s.dataAnswer}>
            <a href={props.profilePage.profile.contacts.vk}>{props.profilePage.profile.contacts.vk}</a>
          </div>
          <div className={s.data}>
            <p>Github:</p>
          </div>
          <div className={s.dataAnswer}>
            <a href={props.profilePage.profile.contacts.instagram}>{props.profilePage.profile.contacts.instagram}</a>
            
          </div>
          {!moreInfoModBoolean&&<button onClick={()=>props.moreInfoMod(true)}>More info</button>}
          
         
        </div>
      </div>}
      <div>
      {moreInfoModBoolean&&<ExtendedProfile moreInfoMod={props.moreInfoMod }saveProfile={props.saveProfile} myProfile={myProfile} profile={props.profilePage.profile}/>}
      {moreInfoModBoolean&&<button onClick={()=>props.moreInfoMod(false)}>Hide</button>}
      </div>
      {myProfile&&<><div className={s.inputPost} >
        <AddNewPostFormRedux onSubmit={addPost}/>
        </div>
        <div className={s.myPosts}>
        <MyPosts posts={props.profilePage.posts} />
      </div></> }
      {!myProfile&&<>
        <div className={s.myPosts}>
        <MyPosts onFriendPage={true}  posts={props.profilePage.posts} />
      </div></>}
    </div>
    
    </>
  );
};

const AddNewPostForm=(props) => {
  return (
    <>
   {!props.onFriendPage && <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'newPostText'}
          placeholder="Whats new?" validate={[requiredField,maxLength10]}
        />
        <button>Post</button>
        </form>}
   {props.onFriendPage && <div></div>}
         </>
        )
       
  
} 

const AddNewPostFormRedux=reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm)

export default Profile;
