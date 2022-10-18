import { connect } from "react-redux"
import { followAC, setCurrentPageAC, setFriendsAC, setTotalUsersCountAC, unfollowAC } from "../../Redux/friendsReducer";
import * as axios from "axios";
import React from "react";
import Friends from "./Friends";

class FriendsContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response=>{
        this.props.setFriends(response.data.items )
        // this.props.setTotalUsersCount(response.data.totalCount) иначе там слишком много юзеров
      })
  }
  onPageChanged=(pageNumber)=>{
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response=>{
        this.props.setFriends(response.data.items )
      })
  }

  render() {
    return <Friends onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount} 
    pageSize={this.props.pageSize} currentPage={this.props.currentPage} friendsData={this.props.friendsData} 
    follow={this.props.follow} unfollow={this.props} />
              
}
}

let mapStatetoProps = (state) => {
    return {
      friendsData:state.friendsPage.friendsData,
      pageSize: state.friendsPage.pageSize,
      totalUsersCount: state.friendsPage.totalUsersCount,
      currentPage: state.friendsPage.currentPage

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
        }

      };
    };



export default connect(mapStatetoProps, mapDispatchtoProps)(FriendsContainer)