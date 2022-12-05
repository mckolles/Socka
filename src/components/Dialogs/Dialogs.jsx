import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import ava from "../Profile/profile-avatar.jpg";
import { Field, reduxForm, } from "redux-form";
import { Textarea } from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";


const maxLength10=maxLengthCreator(10)

const DialogsItems = (props) => {
  return (
    <NavLink to={"/Dialogs/" + props.id}>
      <div className={s.diologs}>
        <div className={s.img}>
          <img src={ava} alt="" />
        </div>
        <div className={s.dialogsItem}>
          <p> {props.name}</p>
        </div>
        <div className={s.message}>{props.message}</div>
      </div>
    </NavLink>
  );
};

const Dialogs = (props) => {  
  let dialog = props.dialogsPage.diologsData.map((d) => (
    <DialogsItems name={d.name} id={d.id} message={d.message} key={d.id} />
  ));
  let addNewMessage = (values) => {
   props.sendSms(values.newMessageBody)
    
  }


  
  return (
    <div className={s.wrapper}>
      <AddMessageFormRedux onSubmit={addNewMessage} />
      {dialog}
    </div>
  );
};

const AddMessageForm=(props)=>{
  return (
  <form onSubmit={props.handleSubmit} >
  <Field component={Textarea} name='newMessageBody'
        validate={[requiredField,maxLength10]}
        className={s.textAreaDiologs}
        placeholder="Send message"
      />
      <button className={s.DiologsButton} >
        Отправить
      </button>
      
  </form>
  )
}

const AddMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;
