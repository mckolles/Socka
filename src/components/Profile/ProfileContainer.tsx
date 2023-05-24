import { connect } from "react-redux";
import { actions,getProfile,updateStatus,getStatus,savePhoto,saveProfile, ThunkType} from "../../Redux/profileReducer";
import Profile from "./Profile";
import React from "react";
import { useParams} from "react-router-dom";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { compose } from "redux";
import { PostType, ProfileType } from "../../Types/types";
import { AppStateType } from "../../Redux/reduxStore";

type MapStatetoPropsType={
  profilePage:{
    posts: PostType[];
    profile: ProfileType | null;
    status: string;
    isMoreInfoMod: boolean;
},
  status:string,
  authorizedUserId:number,
  isAuth:boolean
}

type MapDispatchToPropsType={
  addPost:(message: string) =>void,
  getProfile: (userId: number) => ThunkType,
  updateStatus: (status: string) => ThunkType,
  getStatus: (userId: number) => ThunkType,
  savePhoto: (file: File) => ThunkType,
  setMoreInfoMod: (boolean: boolean) =>void,
  saveProfile: (profile: ProfileType) => Promise<any>
}

type OwnPropsType={
  match: {
    params:{
      userId:number
    }
  }
}

type AllProps=MapDispatchToPropsType&OwnPropsType&MapStatetoPropsType

export function withRouter(ProfileContainer:any):React.FC<AllProps>{ 
  return(props:AllProps)=>
  { const match = {params: useParams()}; return <ProfileContainer {...props} match = {match}/> } }

 class ProfileContainer extends React.Component<AllProps> {
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

let mapStatetoProps = (state:AppStateType) => {  
  return {
    profilePage:state.profilePage,
    status:state.profilePage.status,
    authorizedUserId:state.auth.id,
    isAuth:state.auth.isAuth,
  }
}


export default compose<React.ComponentType>(
  connect(mapStatetoProps,{addPost: actions.addPost,getProfile,updateStatus,getStatus,savePhoto,setMoreInfoMod:actions.setMoreInfoMod,saveProfile}),
  withRouter,
  WithAuthNavigate
)(ProfileContainer)



