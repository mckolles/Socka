import { connect } from "react-redux"
import { follow, setCurrentPage, setFriends, setIsFetching, setTotalUsersCount, unfollow } from "../../Redux/friendsReducer";
import React from "react";
import Friends from "./Friends";
import Preloader from "../Common/Preloader/Preloader";
import {  usersAPI } from "../../Api/Api";

class FriendsContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true)
    usersAPI.getUsers(this.props.currentPage,this.props.pageSize).then(response=>{
      this.props.setIsFetching(false)    
      this.props.setFriends(response.items )
          // this.props.setTotalUsersCount(response.data.totalCount) иначе там слишком много юзеров закоментил
        })
  }

  onPageChanged=(pageNumber)=>{
    this.props.setIsFetching(true)
    this.props.setCurrentPage(pageNumber)
    usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
    .then(response=>{
    this.props.setIsFetching(false)    
    this.props.setFriends(response.items )
      })
  }

  render() {
    return <>
    {this.props.isFetching?<Preloader />:null}
    {!this.props.isFetching?<Friends onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount} 
    pageSize={this.props.pageSize} currentPage={this.props.currentPage} friendsData={this.props.friendsData} 
    follow={this.props.follow} unfollow={this.props.unfollow}  />:null}
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




export default connect(mapStatetoProps, {unfollow,follow,setFriends,setCurrentPage,setTotalUsersCount,setIsFetching})
(FriendsContainer)