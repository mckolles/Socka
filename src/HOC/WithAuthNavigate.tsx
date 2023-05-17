import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../Redux/reduxStore";

type PropsFromRedux = {
  isAuth: boolean;
};
  

export const WithAuthNavigate=(Component:React.ComponentType<PropsFromRedux>): React.ComponentType => {
    class NavigateComponent extends React.Component{
        render(){
            if(!this.props.isAuth) return <Navigate to={'/Login'} />
            return <Component {...this.props} />
    }
}
    let mapStatetoPropsFornavigate = (state:AppStateType) => {
    return {
      isAuth: state.auth.isAuth
    }
  }
  
  let ConnectedNavigateComponent=connect(mapStatetoPropsFornavigate)(NavigateComponent)
  
    return ConnectedNavigateComponent
}