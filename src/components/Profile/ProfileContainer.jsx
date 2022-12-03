import { connect } from "react-redux";
import { addPost, updatePost,getUserProfile} from "../../Redux/profileReducer";
import Profile from "./Profile";
import React from "react";
import { useParams} from "react-router-dom";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { compose } from "redux";



export function withRouter(ProfileContainer){ return(props)=>
  { const match = {params: useParams()}; return <ProfileContainer {...props} match = {match}/> } }

export class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId=this.props.match.params.userId
    if (!userId) {
      userId = 2
    } 
    this.props.getUserProfile(userId)
  }
  render() {
   return <Profile {...this.props} />
  }
}

let mapStatetoProps = (state) => {
  return {
    profilePage:state.profilePage,
  }
}

compose(
  connect(mapStatetoProps,{addPost,updatePost,getUserProfile}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



export default compose(
  connect(mapStatetoProps,{addPost,updatePost,getUserProfile}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



