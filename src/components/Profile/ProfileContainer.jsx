import { connect } from "react-redux";
import { addPost, updatePost,getProfile,updateStatus,getStatus} from "../../Redux/profileReducer";
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
    this.props.getStatus(userId)
    this.props.getProfile(userId)
    
  }
  render() {
   return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
  }
}

let mapStatetoProps = (state) => {  
  return {
    profilePage:state.profilePage,
    status:state.profilePage.status
  }
}

compose(
  connect(mapStatetoProps,{addPost,updatePost,getProfile,updateStatus,getStatus}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



export default compose(
  connect(mapStatetoProps,{addPost,updatePost,getProfile,updateStatus,getStatus}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



