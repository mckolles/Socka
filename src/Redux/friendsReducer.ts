
import { Dispatch } from "redux";
import { updateObjectInArray } from "../components/Common/Utils/Object-helpers";
import { FriendsDataType } from "../Types/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";
import { friendsApi } from "../Api/FriendsApi";

let initialState = {
    friendsData: [] as Array<FriendsDataType>,
    pageSize:10,
    totalUsersCount: 150,
    currentPage:1,
    isFetching: true,
    followingInProgres: []as Array<number>  //Array of friends id
}
export type InitialStateType=typeof initialState



  const friendsReducer = (state = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
      case 'friendsReducer/FOLLOW-FRIEND': 
        return {...state,friendsData:updateObjectInArray(state.friendsData,action.userId,'id',{followed:true})}
      case "friendsReducer/UNFOLLOW-FRIEND": 
        return {...state,friendsData:updateObjectInArray(state.friendsData,action.userId,'id',{followed:false})}
      case "friendsReducer/SET-FRIENDS": 
        return {...state,friendsData:action.friendsData}
      case "friendsReducer/SET-CURRENT-PAGE": 
        return {...state,currentPage: action.currentPage}
      case "friendsReducer/SET-TOTAL-USERS-COUNT": 
        return {...state,totalUsersCount:action.totalUsersCount}
      case "friendsReducer/TOGGLE-IS-FETCHING": 
        return {...state,isFetching:action.isFetching}
      case "friendsReducer/TOGGLE-FOLLOWING-IN-PROGRESS": 
        return {...state,followingInProgres:action.isFetching
          ?[...state.followingInProgres,action.userId]
          :state.followingInProgres.filter(id=>id!==action.userId)}

      default:
        return state;
    }
  };  

export const actions = {
  followSucess:(userId:number) => ({
    type: 'friendsReducer/FOLLOW-FRIEND',
    userId 
  }as const),
  unFollowSucess:(userId:number) => ({
    type: 'friendsReducer/UNFOLLOW-FRIEND',
    userId
  }as const),
  setFriends:(friendsData:Array<FriendsDataType>)=> ({
    type: 'friendsReducer/SET-FRIENDS',
    friendsData
  }as const),
  setCurrentPage:(currentPage:number) => ({
    type: 'friendsReducer/SET-CURRENT-PAGE',
    currentPage
  }as const),
  setTotalUsersCount:(totalUsersCount:number) => ({
    type:'friendsReducer/SET-TOTAL-USERS-COUNT',
    totalUsersCount
  }as const),
  toggleIsFetching:(isFetching:boolean) => ({
    type: 'friendsReducer/TOGGLE-IS-FETCHING',
    isFetching
  }as const),
  toggleFollowingInProgres:(isFetching:boolean,userId:number) => ({
    type: 'friendsReducer/TOGGLE-FOLLOWING-IN-PROGRESS',
    isFetching,
    userId
  }as const)
}

  type ActionsTypes=InferActionsTypes<typeof actions >
  type DispatchType = Dispatch<ActionsTypes>
  type GetStateType=()=>AppStateType
  type ThunkType=BaseThunkType<ActionsTypes>


export const getFriendsThunkCreator=(currentPage:number,pageSize:number) =>{
    return async(dispatch:DispatchType,getState:GetStateType)=>{
    dispatch (actions.toggleIsFetching(true))
    let response=await friendsApi.getUsers(currentPage,pageSize)
    dispatch(actions.setCurrentPage(currentPage))
    dispatch (actions.toggleIsFetching(false))    
    dispatch (actions.setFriends(response.items ))
    dispatch (actions.setTotalUsersCount(response.totalCount)) 
}
}


const followUnfollowFlow=async(dispatch:DispatchType,friendId:number,apiMethod:any,actionCreator:(userId:number)=>ActionsTypes) => {
  dispatch (actions.toggleFollowingInProgres(true,friendId))
  let response=await apiMethod(friendId)
  dispatch (actions.toggleFollowingInProgres(false,friendId))
  if (response.resultCode === 0){
    return dispatch(actionCreator(friendId)) 

  }
 
} 
     

export const follow=(friendId:number):ThunkType =>{
  return async(dispatch:DispatchType)=>{
    followUnfollowFlow(dispatch,friendId,friendsApi.followFriendAPI.bind(friendsApi),actions.followSucess)
  }}

export const unfollow=(friendId:number):ThunkType =>{
  return async(dispatch:DispatchType)=>{
    followUnfollowFlow(dispatch,friendId,friendsApi.unfollowFriendAPI.bind(friendsApi),actions.unFollowSucess)
  }}



  export default friendsReducer;


