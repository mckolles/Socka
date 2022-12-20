import React, { useState } from "react";
import { EditProfileModFormReduxForm } from "./EditProfileMod";
import s from "./ExtendedProfile.module.css"


export const ExtendedProfile=React.memo(({profile,myProfile,saveProfile})=>{
    let [editMode,setEditMode]=useState(false)
    const onSubmit=(formData)=>{
        saveProfile(formData).then(()=>{setEditMode(false)})
    }
   
    return (
        <div className={s.profileData}>
            {myProfile&&!editMode&&<button onClick={()=>setEditMode(true)}>Edit</button>}
            {editMode?<EditProfileModFormReduxForm initialValues={profile}  
            onSubmit={onSubmit}  profile={profile}/>:<ProfileData profile={profile} />}
        </div>
    )
})

const ProfileData=React.memo(({profile})=>{
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

export const Contact=React.memo(({contactTitle,contactValue})=>{
    return <div><b>{contactTitle}:{contactValue}</b></div>
})