
import { Dispatch } from "redux";
import { usersAPI } from "../Api/Api";
import { updateObjectInArray } from "../components/Common/Utils/Object-helpers";
import { FriendsDataType } from "../Types/types";
import { AppStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";

let initialState = {
    friendsData: [] as Array<FriendsDataType>,
    pageSize:10,
    totalUsersCount: 150,
    currentPage:1,
    isFetching: true,
    followingInProgres: []as Array<number>  //aaray of friends id
}
type InitialStateType=typeof initialState

const followFriendConst='friendsReducer/FOLLOW-FRIEND'
const unfollowFriendConst='friendsReducer/UNFOLLOW-FRIEND'
const setFriendsConst='friendsReducer/SET-FRIENDS'
const setCurrentPageConst='friendsReducer/SET-CURRENT-PAGE'
const setTotalUsersCountConst='friendsReducer/SET-TOTAL-USERS-COUNT'
const toggleIsFetchingConst='friendsReducer/TOGGLE-IS-FETCHING'
const followingInProgressConst='friendsReducer/FOLLOWING-IN-PROGRESS'

  const friendsReducer = (state = initialState, action:ActionsType):InitialStateType => {

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

  type ActionsType=FollowSucessType|UnFollowSucessType|SetFriendsType|SetCurrentPageType|ToggleIsFetchingType|ToggleFollowingInProgresType|SetTotalUsersCountType
  
  type FollowSucessType={
    type:typeof followFriendConst
    userId:number
  }
  type UnFollowSucessType={
    type:typeof unfollowFriendConst
    userId:number
  }
  type SetFriendsType={
    type:typeof setFriendsConst
    friendsData:Array<FriendsDataType>
  }
  type SetCurrentPageType={
    type:typeof setCurrentPageConst
    currentPage:number
  }
  type SetTotalUsersCountType={
    type:typeof setTotalUsersCountConst
    totalUsersCount:number
  }
  type ToggleIsFetchingType={
    type:typeof toggleIsFetchingConst
    isFetching:boolean
  }
  type ToggleFollowingInProgresType={
    type:typeof followingInProgressConst
    isFetching:boolean
    userId:number
  }
  export const followSucess= (userId:number):FollowSucessType => ({
    type: followFriendConst,
    userId
  });
  export const unFollowSucess = (userId:number):UnFollowSucessType => ({
    type: unfollowFriendConst,
    userId
  });
  export const setFriends = (friendsData:Array<FriendsDataType>):SetFriendsType => ({
    type: setFriendsConst,
    friendsData
  });
  export const setCurrentPage = (currentPage:number):SetCurrentPageType => ({
    type: setCurrentPageConst,
    currentPage
  });
  export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountType => ({
    type: setTotalUsersCountConst,
    totalUsersCount
  });
  export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingType => ({
    type: toggleIsFetchingConst,
    isFetching
  });
  export const toggleFollowingInProgres = (isFetching:boolean,userId:number):ToggleFollowingInProgresType => ({
    type: followingInProgressConst,
    isFetching,
    userId
  });

  type DispatchType = Dispatch<ActionsType>
  type GetStateType=()=>AppStateType
  type ThunkType=ThunkAction<Promise<void>,AppStateType,unknown,ActionsType>
   export const getFriendsThunkCreator=(currentPage:number,pageSize:number) =>{
  return async(dispatch:DispatchType,getState:GetStateType)=>{
   dispatch (toggleIsFetching(true))
    let response=await usersAPI.getUsers(currentPage,pageSize)
    dispatch(setCurrentPage(currentPage))
    dispatch (toggleIsFetching(false))    
    dispatch (setFriends(response.items ))
    dispatch (setTotalUsersCount(response.totalCount)) 
}
}

const followUnfollowFlow=async(dispatch:DispatchType,friendId:number,apiMethod:any,actionCreator:(userId:number)=>ActionsType) => {
  dispatch (toggleFollowingInProgres(true,friendId))
  let response=await apiMethod(friendId)
  dispatch (toggleFollowingInProgres(false,friendId))
  if (response.data.resultCode === 0){
    return dispatch(actionCreator(friendId)) 
  }
 
} 
     

export const follow=(friendId:number):ThunkType =>{
  return async(dispatch:DispatchType)=>{
    followUnfollowFlow(dispatch,friendId,usersAPI.followFriendAPI.bind(usersAPI),followSucess)
  }}

export const unfollow=(friendId:number):ThunkType =>{
  return async(dispatch:DispatchType)=>{
    followUnfollowFlow(dispatch,friendId,usersAPI.unfollowFriendAPI.bind(usersAPI),unFollowSucess)
  }}



  export default friendsReducer;


