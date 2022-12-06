// Импорты тут

import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfileContainer, { withRouter } from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DiologsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import MyProfile from "./components/Profile/MyProfile";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import {initializeApp} from "./Redux/appReducer"
import Preloader from "./components/Common/Preloader/Preloader";


// Основнная компонента
class App extends React.Component  {
  componentDidMount() {
    this.props.initializeApp()
  }
  render(){
  if(!this.props.initialized){
    return <Preloader />
  }
  else
  return (
    <BrowserRouter>
      <HeaderContainer />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/Socka" element={<MyProfile />}/>
          <Route path="/Profile/:userId" element={<ProfileContainer />}/>
          <Route path="/Profile" element={<MyProfile />}/>
          <Route path="/Dialogs" element={<DialogsContainer />}/>
          <Route path="/News" element={<DialogsContainer />} />
          <Route path="/Music" element={<DialogsContainer />} />
          <Route path="/Settings" element={<DialogsContainer />} />
          <Route path="/Friends" element={<FriendsContainer />} />
          <Route path="/Login" element={<Login />} />
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
  )
}
}

const mapStateToProps = (state) =>({
  initialized:state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp}))(App)

