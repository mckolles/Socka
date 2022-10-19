import { connect } from "react-redux"
import { followAC, setCurrentPageAC, setFriendsAC, setIsFetchingAC, setTotalUsersCountAC, unfollowAC } from "../../Redux/friendsReducer";
import * as axios from "axios";
import React from "react";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";

class FriendsContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response=>{
    this.props.setIsFetching(false)    
    this.props.setFriends(response.data.items )
        // this.props.setTotalUsersCount(response.data.totalCount) иначе там слишком много юзеров
      })
  }
  onPageChanged=(pageNumber)=>{
    this.props.setIsFetching(true)
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response=>{
    this.props.setIsFetching(false)    
    this.props.setFriends(response.data.items )
      })
  }

  render() {
    return <>
    {this.props.isFetching?<Preloader />:null}
    {!this.props.isFetching?<Friends onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount} 
    pageSize={this.props.pageSize} currentPage={this.props.currentPage} friendsData={this.props.friendsData} 
    follow={this.props.follow} unfollow={this.props}  />:null}
    </>
              
}
}

let mapStatetoProps = (state) => {
    return {
      friendsData:state.friendsPage.friendsData,
      pageSize: state.friendsPage.pageSize,
      totalUsersCount: state.friendsPage.totalUsersCount,
      currentPage: state.friendsPage.currentPage,
      isFetching:state.friendsPage.isFetching

    }
    }
let mapDispatchtoProps = (dispatch) => {
      return {
        unfollow: (userId) => {
          dispatch(unfollowAC(userId));
        },
        follow: (userId) => {
          dispatch(followAC(userId));
        },
        setFriends: (friends) => {
          dispatch(setFriendsAC(friends));
        },
        setCurrentPage:(pageNumber)=>{
          dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount:(totalCount)=>{
          dispatch(setTotalUsersCountAC(totalCount))
        },
        setIsFetching:(isFetching)=>{
          dispatch(setIsFetchingAC(isFetching))
        }

      };
    };



export default connect(mapStatetoProps, mapDispatchtoProps)(FriendsContainer)