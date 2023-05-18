import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../Redux/reduxStore";

type PropsFromRedux = {
  isAuth: boolean;
};

export const WithAuthNavigate = (
  Component: React.FC<any>
): React.ComponentType => {
  class NavigateComponent extends React.Component<PropsFromRedux> {
    render() {
      if (!this.props.isAuth) return <Navigate to={'/Login'} />;
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: AppStateType) => {
    return {
      isAuth: state.auth.isAuth
    };
  }

  const ConnectedNavigateComponent = connect(mapStateToProps)(NavigateComponent);

  return ConnectedNavigateComponent;
};

