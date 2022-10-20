import { connect } from "react-redux";
import { addPost, updatePost,setUserProfile} from "../../Redux/profileReducer";
import Profile from "./Profile";
import React from "react";
import * as axios from "axios";
import { useParams} from "react-router-dom";


export function withRouter(ProfileContainer){ return(props)=>
  { const match = {params: useParams()}; return <ProfileContainer {...props} match = {match}/> } }

export class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId=this.props.match.params.userId
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId).then(response=>{
    this.props.setUserProfile(response.data)
      })
  }
  render() {
   return <Profile {...this.props} />
  }
}


let mapStatetoProps = (state) => {
  return {
    profilePage:state.profilePage
  }
}

let withUrlDataContainerComponent=withRouter(ProfileContainer)


export default connect(mapStatetoProps, {addPost,updatePost,setUserProfile})(withUrlDataContainerComponent)


