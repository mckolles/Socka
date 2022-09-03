import React from "react";
import s from './Header.module.css';
import Logo from '../Header/logo-icon.jpg'



const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.headerImg}>
      <img 
        src={Logo}
        alt="Logo"
      />
      </div>
      
    </div>
  );
};

export default Header;
