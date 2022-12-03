import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";


export const WithAuthNavigate=(Component) => {
    class NavigateComponent extends React.Component{
        render(){
            if(!this.props.isAuth) return <Navigate to={'/Login'} />
            return <Component {...this.props} />
    }
}
    let mapStatetoPropsFornavigate = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }
  
  let ConnectedNavigateComponent=connect(mapStatetoPropsFornavigate)(NavigateComponent)
  
    return ConnectedNavigateComponent
}