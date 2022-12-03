import React from "react";
import { connect } from "react-redux";
import { getAuthUserData } from "../../Redux/authReducer";
import Header from "./Header";




class HeaderContainer extends React.Component {
  componentDidMount(){
    this.props.getAuthUserData()
  }
  render() {
  return <Header {...this.props} />
}
}

const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})
export default connect(mapStatetoProps,{getAuthUserData}) (HeaderContainer)
