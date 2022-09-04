import React from "react";
import s from './Dialogs.module.css';
import { NavLink } from "react-router-dom";


const Dialog =(props)=>{
    return (
        <NavLink to={"/Dialogs/"+props.id}>
        <div className={s.diologs}>
        <div className={s.dialogsItem}>
            <div className={s.dialog}>
                {props.name}
            </div>
            </div>
            <div className={s.message}>{props.message}</div>
        </div>
        </NavLink>
    )
}


const Dialogs =()=>{
    return(
        <div className={s.wrapper}>
        <Dialog name="Sveta" id="1" message="Hi"/>
        <Dialog name="Sasha" id="2" message="Hello pidor"/>
        <Dialog name="Sergey" id="3" message="Im tsar"/>
        <Dialog name="Sveta" id="1" message="Hi"/>
        <Dialog name="Sveta" id="1" message="Hi"/>
       
        </div>
       
    )
}

export default Dialogs;