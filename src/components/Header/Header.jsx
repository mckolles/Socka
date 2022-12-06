import React from "react";
import s from './Header.module.css';
import Logo from '../Header/logo-icon.jpg'
import { NavLink} from "react-router-dom";



const Header = (props) => {
  return (
    <div className={s.header}>
      <div className={s.headerImg}>
      <img 
        src={Logo}
        alt="Logo"
      />
      </div>
      <div className={s.loginBlock}>
        {props.isAuth?<div className={s.login}>{props.login} <button onClick={props.logOut}>Logout</button></div>:
        <NavLink to={'/login'}>Login</NavLink>}
      </div>
      
    </div>
  );
};

export default Header;
