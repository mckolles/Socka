import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../../Common/Utils/FormControls";
import s from "./ExtendedProfile.module.css"


 const EditProfileModForm=React.memo(({profile,handleSubmit,error})=>{
    return <form onSubmit={handleSubmit}>
    <button>Save</button>
    {error&&<div className={s.error} >{error}</div>}
    <div><b>Fullname:</b></div> 
    <Field component={Input} name={'fullName'} placeholder={'Fullname' }/>
    <div><b>Looking for a job:</b></div>
    <Field component={Input}  name={'lookingForAJob'} type={'checkbox'}/>
    <div><b>My proffesional skills:</b></div>
    <Field component={Textarea} name={'lookingForAJobDescription'} placeholder={'My skills...'}/>
    <div><b>About me:</b></div>
    <Field component={Textarea} name={'aboutMe'} placeholder={'About me...'}/>
     <div>
         Contacts:{Object.keys(profile.contacts).map(key=>{return <div key={key}><b>{key}:</b>
     <Field  component={Input} name={'contacts.'+key} placeholder={key}/></div>})}
     </div>
     </form>
})

export const EditProfileModFormReduxForm=reduxForm({form: "EditProfile"})(EditProfileModForm)