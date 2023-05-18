
import React,{Suspense, lazy} from "react";
import "./App.css";
import {HashRouter, Route, Routes } from "react-router-dom";
import { withRouter } from "./components/Profile/ProfileContainer";
import MyProfile from "./components/Profile/MyProfile";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import {initializeApp} from "./Redux/appReducer"
import Preloader from "./components/Common/Preloader/Preloader";
import { AppStateType } from "./Redux/reduxStore";
import HeaderContainer from "./components/Header/HeaderContainer";
import Nav from "./components/Nav/Nav";

const DialogsContainer=lazy(()=>import ('./components/Dialogs/DiologsContainer'))
const ProfileContainer=lazy(()=>import ('./components/Profile/ProfileContainer'))
const FriendsContainer=lazy(()=>import ('./components/Friends/FriendsContainer'))


type MapStateToPropsType={
  initialized:boolean

}

type MapDispatchToPropsType={
  initializeApp:()=>Promise<void>
}

// Основнная компонента
class App extends React.Component<MapStateToPropsType&MapDispatchToPropsType>  {
  catchAllUnhandledErrors=(e:PromiseRejectionEvent)=>{
    alert('Something went wrong')
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection',this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection',this.catchAllUnhandledErrors)
  }
  render(){
  if(!this.props.initialized){
    return <Preloader />
  }
  else
  return (
   
    <HashRouter basename={process.env.PUBLIC_URLn}>
      <HeaderContainer />
      <div className="container">
        <Nav />
        <Suspense fallback={<Preloader />} >
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/Profile/:userId" element={<ProfileContainer />}/>
          <Route path="/Profile" element={<MyProfile />}/>
          <Route path="/Dialogs" element={<DialogsContainer />}/>
          <Route path="/Friends" element={<FriendsContainer  />} />
          <Route path="/Login" element={<Login />} />
          <Route
      path="*"
      element={
        <main style={{ padding: "1rem", color:'white'}}>
          <p>There's nothing here!</p>
        </main>
      }
    />
        </Routes>
        </Suspense>
      </div>
    </HashRouter>
  )
}
}

const mapStateToProps = (state:AppStateType) =>({
  initialized:state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps,{initializeApp}))(App)






let findNaturalNumber=(startInterval:number,endInterval:number)=>{
  let resultArray=[]
  if(endInterval>startInterval&&startInterval>=0){
    nextNumber:
    for(let i=startInterval;i<=endInterval;i++){
      for(let j=1;j<i;j++){
        if(i%j===0&&i!==j&&j!==1) continue nextNumber 
      }
      if(i>0)resultArray.push(i)
  }
  console.log(resultArray)
  }
  else alert('Пожалуйста, выбери положительный диапазон например от 1 до 5')

}
findNaturalNumber(0,10)

