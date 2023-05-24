import React, { useState } from "react";
import { EditProfileModFormReduxForm } from "./EditProfileMod";
import s from "./ExtendedProfile.module.css"
import { ProfileType } from "../../../Types/types";


type ExtendedProfileProps={
    profile:ProfileType,    
    isMyProfile:boolean, 
    saveProfile:(profile: ProfileType) => Promise<any>
}


export const ExtendedProfile:React.FC<ExtendedProfileProps>=React.memo(({profile,isMyProfile,saveProfile})=>{
    let [editMode,setEditMode]=useState(false)
    const handleSubmit = (formData: ProfileType) => {
       

      }
   
    return (
        <div className={s.profileData}>
            {isMyProfile&&!editMode&&<button onClick={()=>setEditMode(true)}>Edit</button>}
            {editMode?<EditProfileModFormReduxForm initialValues={profile}  
            handleSubmit={handleSubmit} profile={profile}/>:<ProfileData profile={profile} />}
        </div>
    )
})

type ProfileDataType={
    profile:{
        lookingForAJob: boolean;
        lookingForAJobDescription: string;
        fullName: string;
        contacts: {[key: string]: string | null}
        aboutMe: string;
    },  
}

const ProfileData:React.FC<ProfileDataType>=React.memo(({profile})=>{
    return <><div><b>Fullname:{profile.fullName}</b></div> 
    <div><b>Looking for a job:{profile.lookingForAJob?' Yes':' no'}</b></div>
     {profile.lookingForAJob&&
     <div>
         <b>My proffesional skills:{profile.lookingForAJobDescription}</b>
         </div>}
     <div><b>About me:{profile.aboutMe}</b></div>
     <div>
         Contacts:{Object.keys(profile.contacts).map(key=>{return <Contact key={key}
        contactTitle={key} contactValue={profile.contacts[key]}/>})}
     </div>
     </>
})

type ContactProps = {
    contactTitle: string;
    contactValue: string | null;
  };
  
  export const Contact: React.FC<ContactProps> = React.memo(({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}: {contactValue}</b></div>;
  });
  