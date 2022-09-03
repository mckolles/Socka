import React from "react";
import { NavLink } from "react-router-dom";
import s from './Nav.module.css';
import Dicon from '../Nav/img/dialogs-icon.png';
import Ficon from '../Nav/img/friends-icon.png';
import Micon from '../Nav/img/music-icon.png';
import Nicon from '../Nav/img/news-icon.png';
import Sicon from '../Nav/img/settings-icon.png';
import Picon from '../Nav/img/profile-icon.png';

const Nav = () => {
  return (
    <div className={s.nav}>
      <div className={s.navWrapper}>
      <div className={s.navImg}>
      <img src={Picon} alt="Profile icon"></img>
        <NavLink to="/Profile">Profile</NavLink>
      </div>
      <div className={s.navImg}>
      <img src={Dicon} alt="Dialogs icon"></img>
      <NavLink to="/Dialogs">Dialogs</NavLink>
      </div>
      <div className={s.navImg}>
      <img src={Nicon} alt="News icon"></img>
      <NavLink to="/News">News</NavLink>
      </div>
      <div className={s.navImg}>
      <img src={Micon} alt="Profile icon"></img>
      <NavLink to="/Music">Music</NavLink>
      </div>
      <div className={s.navImg}>
      <img src={Sicon} alt="Settings icon"></img>
      <NavLink to="/Settings">Settings</NavLink>
      </div>
      <div className={s.navImg}>
      <img src={Ficon} alt="Friends icon"></img>
      <NavLink to="/Friends">Friends</NavLink>
      </div>
      </div>
    </div>
  );
};

export default Nav;
