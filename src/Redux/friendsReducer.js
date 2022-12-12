import { usersAPI } from "../Api/Api";

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
        return {...state,friendsData:state.friendsData.map(f => {
                    if (f.id===action.userId){
                        return {...f,followed:true}
                    }
                    return f
                }
            )
        }
      
      case unfollowFriendConst: 
        return {
            ...state,friendsData:state.friendsData.map(f => {
                    if (f.id===action.userId){
                        return {...f,followed:false}
                    }
                    return f
                }
            )
        }
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
    // dispatch (setTotalUsersCount(response.totalCount)) слишком много юзеров 
}
}
export const follow=(friendId) =>{
  return async(dispatch)=>{
   dispatch (toggleFollowingInProgres(true,friendId))
   let response=await usersAPI.followFriendAPI(friendId)
    dispatch (toggleFollowingInProgres(false,friendId))    
    if (response.data.resultCode === 0){
            return dispatch(followSucess(friendId))
          }}
    }
export const unfollow=(friendId) =>{
  return async(dispatch)=>{
   dispatch (toggleFollowingInProgres(true,friendId))
   let response=await usersAPI.unfollowFriendAPI(friendId)
    dispatch (toggleFollowingInProgres(false,friendId))    
    if (response.data.resultCode === 0){
            return dispatch(unFollowSucess(friendId))
          }}
}

  export default friendsReducer;


  // toggleFollowingInProgres(true,userId)
  // return instance.post(`follow/${friendId}`,{})
  //   .then(response=>{
  //     toggleFollowingInProgres(false,userId)
  //     if (response.data.resultCode === 0){
  //       return follow(friendId)
  //     }