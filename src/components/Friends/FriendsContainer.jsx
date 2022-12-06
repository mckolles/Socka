import { connect } from "react-redux"
import { follow, unfollow,
  toggleFollowingInProgres,getFriendsThunkCreator as getFriends } from "../../Redux/friendsReducer";
import React from "react";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { WithAuthNavigate } from "../../HOC/WithAuthNavigate";
import { getCurrentPage, getfriends, getPageSize, getTotalFriendsCount, getFollowingInProgres, getIsFetching } from "../../Redux/friendsSelectors";



class FriendsContainer extends React.Component {
  componentDidMount() {
    this.props.getFriends(this.props.currentPage,this.props.pageSize)
  }

  onPageChanged=(pageNumber)=>{
    this.props.getFriends(pageNumber,this.props.pageSize)
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

// let mapStatetoProps = (state) => {
//     return {
//       friendsData:state.friendsPage.friendsData,
//       pageSize: state.friendsPage.pageSize,
//       totalUsersCount: state.friendsPage.totalUsersCount,
//       currentPage: state.friendsPage.currentPage,
//       isFetching:state.friendsPage.isFetching,
//       followingInProgres:state.friendsPage.followingInProgres

//     }
//     }

let mapStatetoProps = (state) => {
    return {
      friendsData:getfriends(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalFriendsCount(state),
      currentPage: getCurrentPage(state),
      isFetching:getIsFetching(state),
      followingInProgres:getFollowingInProgres(state)

    }
    }



export default compose(
  
  connect(mapStatetoProps, {
    unfollow,follow,
    toggleFollowingInProgres,
    getFriends}),
    WithAuthNavigate
)(FriendsContainer)