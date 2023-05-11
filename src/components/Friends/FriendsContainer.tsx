import { connect } from "react-redux"
import { follow, unfollow,getFriendsThunkCreator } from "../../Redux/friendsReducer";
import React from "react";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { getCurrentPage, getfriends, getPageSize, getTotalFriendsCount, getFollowingInProgres, getIsFetching } from "../../Redux/friendsSelectors";
import { FriendsDataType } from "../../Types/types";
import { AppStateType } from "../../Redux/reduxStore";


type MapStateProps={
  currentPage:number,
  pageSize:number,
  isFetching:boolean,
  totalUsersCount:number,
  friendsData:Array<FriendsDataType>,
  followingInProgres:Array<number>,
}
type MapDispatchProps={
  follow:(friendId:number)=>void,
  unfollow:(friendId:number)=>void,
  getFriendsThunkCreator:(currentPage:number,pageSize:number)=>void
}
type OwnPropsType={
  
}

type PropsType=MapStateProps&MapDispatchProps


class FriendsContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getFriendsThunkCreator(this.props.currentPage,this.props.pageSize)
  }

  onPageChanged=(pageNumber:number)=>{
    this.props.getFriendsThunkCreator(pageNumber,this.props.pageSize)
  }

  render() {
    return <>
    {this.props.isFetching?<Preloader />:null}
    {!this.props.isFetching?<Friends onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount} 
    pageSize={this.props.pageSize} currentPage={this.props.currentPage} friendsData={this.props.friendsData} 
    follow={this.props.follow} unfollow={this.props.unfollow} 
    followingInProgres={this.props.followingInProgres} />:null}
    </>
              
}
}

let mapStatetoProps = (state:AppStateType):MapStateProps => {
    return {
      friendsData:getfriends(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalFriendsCount(state),
      currentPage: getCurrentPage(state),   
      isFetching:getIsFetching(state),
      followingInProgres:getFollowingInProgres(state)
    }
    }



export default compose<PropsType>(
  
  connect<MapStateProps,MapDispatchProps,OwnPropsType,AppStateType>(mapStatetoProps,{unfollow,follow,getFriendsThunkCreator}),
    WithAuthNavigate
)(FriendsContainer)