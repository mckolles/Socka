import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./My posts/MyPosts";
import Preloader from "../Common/Preloader/Preloader";
import { Field, InjectedFormProps, reduxForm, } from "redux-form";
import { Textarea } from "../Common/Utils/FormControls";
import ProfileStatusWithHooks from "./ProfileInfo/ProfileStatusWithHooks";
import { ExtendedProfile } from "./ProfileInfo/ExtendedProfile";
import { ThunkType } from "../../Redux/profileReducer";
import { PostType, ProfileType } from "../../Types/types";

type MapStatetoPropsType={
  profilePage:{
    posts: PostType[];
    profile: ProfileType | null;
    status: string;
    isMoreInfoMod: boolean;
},
  status:string,
  authorizedUserId:number,
  isAuth:boolean
}

type MapDispatchToPropsType={
  addPost:(message: string) =>void,
  getProfile: (userId: number) => ThunkType,
  updateStatus: (status: string) => ThunkType,
  getStatus: (userId: number) => ThunkType,
  savePhoto: (file: File) => ThunkType,
  setMoreInfoMod: (boolean: boolean) =>void,
  saveProfile: (profile: ProfileType) => Promise<any>
}

type OwnPropsType={
  match: {
    params:{
      userId:number
    }
  }
}

type AllProps=MapDispatchToPropsType&OwnPropsType&MapStatetoPropsType

const Profile:React.FC<AllProps> = (props) => {
  let addPost = (values:{newPostText:string}) => {
    props.addPost(values.newPostText);
  }
 
  let isMyProfile=!props.match.params.userId
  let isMoreInfoMod=props.profilePage.isMoreInfoMod
  if(!props.profilePage.profile) {
      return <Preloader />
  }
  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  
  return (
   <>
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <div className={s.img}>
          <img src={props.profilePage.profile.photos.large !=null?props.profilePage.profile.photos.large:
                        "https://sun9-49.userapi.com/impg/qSLuFyG2PoXIJWHi5vuUom481lPU_olynB9u8Q/Ta4Q0Yh4-ec.jpg?size=176x215&quality=95&sign=aac022efdebdf0144d3a10e9f5f557c4&type=album"}
                         alt="" />
        </div>
       {isMyProfile&&<input type='file' onChange={onMainPhotoSelected}></input>}
      </div>
     {!isMoreInfoMod&&<div className={s.description}>
        <div className={s.descriptionEl}>
          <div className={s.descriptionH1}>
            <h1>{props.profilePage.profile.fullName}</h1>
            <hr className={s.hrShelf} />
          </div>
          <div className={s.data}>
            <p>Status:</p>
          </div>
          <div className={s.dataAnswer}>
           {isMyProfile?<p><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></p>:
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
          {!isMoreInfoMod&&<button onClick={()=>props.setMoreInfoMod(true)}>More info</button>}
          
         
        </div>
      </div>}
      <div>
      {isMoreInfoMod&&<ExtendedProfile  saveProfile={props.saveProfile} isMyProfile={isMyProfile} profile={props.profilePage.profile}/>}
      {isMoreInfoMod&&<button onClick={()=>props.setMoreInfoMod(false)}>Hide</button>}
      </div>
      {isMyProfile&&<><div className={s.inputPost} >
        <AddNewPostFormRedux onSubmit={addPost}/>
        </div>
        <div className={s.myPosts}>
        <MyPosts  posts={props.profilePage.posts} />
      </div></> }
      {!isMyProfile&&<>
        <div className={s.myPosts}>
        <MyPosts onFriendPage={true}  posts={props.profilePage.posts} />
      </div></>}
    </div>
    
    </>
  );
};

type AddNewPostFormValuesType = {
  newPostText: string;
};

type AddNewPostFormOwnProps = {
  onFriendPage?: boolean;
};

type AddNewPostFormProps = InjectedFormProps<AddNewPostFormValuesType, AddNewPostFormOwnProps> &
  AddNewPostFormOwnProps;

const AddNewPostForm:React.FC<AddNewPostFormProps>=(props) => {
  return (
    <>
   {!props.onFriendPage && <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'newPostText'}
          placeholder="Whats new?"
        />
        <button>Post</button>
        </form>}
   {props.onFriendPage && <div></div>}
         </>
        )
       
  
} 

const AddNewPostFormRedux=reduxForm<AddNewPostFormValuesType, AddNewPostFormOwnProps>({form:'ProfileAddNewPostForm'})(AddNewPostForm)

export default Profile;
