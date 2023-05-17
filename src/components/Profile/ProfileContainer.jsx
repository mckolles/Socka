import { connect } from "react-redux";
import { actions,getProfile,updateStatus,getStatus,savePhoto,saveProfile} from "../../Redux/profileReducer";
import Profile from "./Profile";
import React from "react";
import { useParams} from "react-router-dom";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { compose } from "redux";



export function withRouter(ProfileContainer){ return(props)=>
  { const match = {params: useParams()}; return <ProfileContainer {...props} match = {match}/> } }

 class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId=this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
    } 
    this.props.getStatus(userId)
    this.props.getProfile(userId)
    
  }
  render() {
   return <Profile {...this.props}/>
  }
}

let mapStatetoProps = (state) => {  
  return {
    profilePage:state.profilePage,
    status:state.profilePage.status,
    authorizedUserId:state.auth.id,
    isAuth:state.auth.isAuth,
  }
}


export default compose(
  connect(mapStatetoProps,{addPost: actions.addPost,getProfile,updateStatus,getStatus,savePhoto,moreInfoMod:actions.moreInfoMod,saveProfile}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



