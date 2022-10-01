import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import ava from "../Profile/profile-avatar.jpg";

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
  let updateSms = (e) => {
   let message=e.target.value
   props.updateSms(message)
  }
  let sendSms = () => {
   props.sendSms()
    
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
