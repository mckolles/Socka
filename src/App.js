// Импорты тут

import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DiologsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";

// Основнная компонента
const App = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/Socka" element={<ProfileContainer />}/>
          <Route path="/Profile/:userId" element={<ProfileContainer />}/>
          <Route path="/Profile" element={<ProfileContainer />}/>
          <Route path="/Dialogs" element={<DialogsContainer />}/>
          <Route path="/News" element={<DialogsContainer />} />
          <Route path="/Music" element={<DialogsContainer />} />
          <Route path="/Settings" element={<DialogsContainer />} />
          <Route path="/Friends" element={<FriendsContainer />} />
          <Route
      path="*"
      element={
        <main style={{ padding: "1rem"  }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
