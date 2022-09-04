// Импорты + картинки

import React from "react";
import { NavLink } from "react-router-dom";
import s from './Nav.module.css';
import Dicon from '../Nav/img/dialogs-icon.png';
import Ficon from '../Nav/img/friends-icon.png';
import Micon from '../Nav/img/music-icon.png';
import Nicon from '../Nav/img/news-icon.png';
import Sicon from '../Nav/img/settings-icon.png';
import Picon from '../Nav/img/profile-icon.png';

// Каждый элемент нава

const NavEl = (props) => {
  return (
    <div className={s.navImg}>
    <img src={props.src} alt="Profile icon"></img>
      <NavLink to={"/"+props.name}>{props.name}</NavLink>
    </div>
  )
}

// Сам нав

const Nav = () => {
  return (
    <div className={s.nav}>
      <div className={s.navWrapper}>
      <NavEl src={Picon} name="Profile" />
      <NavEl src={Dicon} name="Dialogs" />
      <NavEl src={Micon} name="Music" />
      <NavEl src={Nicon} name="News" />
      <NavEl src={Sicon} name="Settings" />
      <NavEl src={Ficon} name="Friends" />
    </div>
    </div>  
  );
};

export default Nav;
