// Импорты тут

import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route, Routes } from "react-router-dom";




// Основнная компонента
const App = () => {
  return (
    <BrowserRouter>
    <Header /> 
    <div className="container">
      <Nav />
        <Routes>
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Dialogs" element={<Dialogs/>} />
        <Route path="/News" element={<Dialogs/>} />
        <Route path="/Music" element={<Dialogs/>} />
        <Route path="/Settings" element={<Dialogs/>} />
        <Route path="/Friends" element={<Dialogs/>} />
        </Routes> 
    </div>
    </BrowserRouter>
  );
};

export default App;
