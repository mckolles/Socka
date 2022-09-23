import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import ava from "../Profile/profile-avatar.jpg";
import { updateDiaolgsTextAreActionCreator } from "../../store";
import { addDiaolgsTextAreActionCreator } from "../../store";

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
    <DialogsItems name={d.name} id={d.id} message={d.message} />
  ));
  let updateSms = (e) => {
   let message=e.target.value
   props.dispatch(updateDiaolgsTextAreActionCreator(message))
  }
  let sendSms = () => {
   props.dispatch(addDiaolgsTextAreActionCreator())
    
  }
  
  return (
    <div className={s.wrapper}>
      <textarea
        className={s.textAreaDiologs}
        value={props.dialogsPage.valueTextArea}
        onChange={updateSms}
        placeholder="Send message"
      />
      <button className={s.DiologsButton} onClick={sendSms}>
        Отправить
      </button>
      {dialog}
    </div>
  );
};

export default Dialogs;
