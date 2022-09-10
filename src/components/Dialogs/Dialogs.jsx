import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import ava from "../Profile/profile-avatar.jpg"

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
  let dialog = props.dialogsPage.map((d) => (
    <DialogsItems name={d.name} id={d.id} message={d.message} />
  ));
  return <div className={s.wrapper}>{dialog}</div>;
};

export default Dialogs;
