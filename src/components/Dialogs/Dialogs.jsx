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

const Dialogs = () => {
  let dialogsData = [
    { name: "Sveta", id: "1", message: "Hi" },
    { name: "Sasha", id: "2", message: "Hello pidor" },
    { name: "Sergey", id: "3", message: "Im tsar" },
    { name: "Arseniy", id: "4", message: "Hello Im pidor" },
    { name: "Vladilen", id: "5", message: "Im a gayfish" },
  ];
  let dialog = dialogsData.map((d) => (
    <DialogsItems name={d.name} id={d.id} message={d.message} />
  ));
  return <div className={s.wrapper}>{dialog}</div>;
};

export default Dialogs;
