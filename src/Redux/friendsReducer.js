import { usersAPI } from "../Api/Api";
import { updateObjectInArray } from "../components/Common/Utils/Object-helpers";

let initialState = {
    friendsData: [],
    pageSize:10,
    totalUsersCount: 150,
    currentPage:1,
    isFetching: true,
    followingInProgres: []
}

const followFriendConst='friendsReducer/FOLLOW-FRIEND'
const unfollowFriendConst='friendsReducer/UNFOLLOW-FRIEND'
const setFriendsConst='friendsReducer/SET-FRIENDS'
const setCurrentPageConst='friendsReducer/SET-CURRENT-PAGE'
const setTotalUsersCountConst='friendsReducer/SET-TOTAL-USERS-COUNT'
const toggleIsFetchingConst='friendsReducer/TOGGLE-IS-FETCHING'
const followingInProgressConst='friendsReducer/FOLLOWING-IN-PROGRESS'

  const friendsReducer = (state = initialState, action) => {

    switch (action.type) {
      case followFriendConst: 
        return {...state,friendsData:updateObjectInArray(state.friendsData,action.userId,'id',{followed:true})}
      case unfollowFriendConst: 
        return {...state,friendsData:updateObjectInArray(state.friendsData,action.userId,'id',{followed:false})}
      case setFriendsConst: 
        return {...state,friendsData:action.friendsData}
      case setCurrentPageConst: 
        return {...state,currentPage: action.currentPage}
      case setTotalUsersCountConst: 
        return {...state,totalUsersCount:action.totalUsersCount}
      case toggleIsFetchingConst: 
        return {...state,isFetching:action.isFetching}
      case followingInProgressConst: 
        return {...state,followingInProgres:action.isFetching
          ?[...state.followingInProgres,action.userId]
          :state.followingInProgres.filter(id=>id!==action.userId)}

      default:
        return state;
    }
  };  
  
  export const followSucess= (userId) => ({
    type: followFriendConst,
    userId
  });
  export const unFollowSucess = (userId) => ({
    type: unfollowFriendConst,
    userId
  });
  export const setFriends = (friendsData) => ({
    type: setFriendsConst,
    friendsData
  });
  export const setCurrentPage = (currentPage) => ({
    type: setCurrentPageConst,
    currentPage
  });
  export const setTotalUsersCount = (totalUsersCount) => ({
    type: setTotalUsersCountConst,
    totalUsersCount
  });
  export const toggleIsFetching = (isFetching) => ({
    type: toggleIsFetchingConst,
    isFetching
  });
  export const toggleFollowingInProgres = (isFetching,userId) => ({
    type: followingInProgressConst,
    isFetching,
    userId
  });

  
export const getFriendsThunkCreator=(currentPage,pageSize) =>{
  return async(dispatch)=>{
   dispatch (toggleIsFetching(true))
    let response=await usersAPI.getUsers(currentPage,pageSize)
    dispatch(setCurrentPage(currentPage))
    dispatch (toggleIsFetching(false))    
    dispatch (setFriends(response.items ))
    dispatch (setTotalUsersCount(response.totalCount)) 
}
}

const followUnfollowFlow=async(dispatch,friendId,apiMethod,actionCreator) => {
  dispatch (toggleFollowingInProgres(true,friendId))
  let response=await apiMethod(friendId)
  dispatch (toggleFollowingInProgres(false,friendId))
  if (response.data.resultCode === 0){
    return dispatch(actionCreator(friendId)) 
  }
 
} 
     

export const follow=(friendId) =>{
  return async(dispatch)=>{
    followUnfollowFlow(dispatch,friendId,usersAPI.followFriendAPI.bind(usersAPI),followSucess)
  }}

export const unfollow=(friendId) =>{
  return async(dispatch)=>{
    followUnfollowFlow(dispatch,friendId,usersAPI.unfollowFriendAPI.bind(usersAPI),unFollowSucess)
  }}



  export default friendsReducer;


