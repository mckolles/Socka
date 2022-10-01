// Импорты тут

import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DiologsContainer";

// Основнная компонента
const App = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/Profile" element={<ProfileContainer />}/>
          <Route path="/Dialogs" element={<DialogsContainer />}/>
          <Route path="/News" element={<DialogsContainer />} />
          <Route path="/Music" element={<DialogsContainer />} />
          <Route path="/Settings" element={<DialogsContainer />} />
          <Route path="/Friends" element={<DialogsContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
