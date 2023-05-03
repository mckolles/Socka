import React from "react";
import {Paginator} from "../Common/Utils/Paginator";
import {FriendsMap} from "./FriendsMap";
import { FriendsDataType } from "../../Types/types";

type PropsType={
    totalUsersCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged:(pageNumber:number)=>void,
    friendsData:Array<FriendsDataType>,
    followingInProgres:Array<number>
    follow:(friendId:number)=>void,
    unfollow:(friendId:number)=>void

  }

let Friends:React.FC<PropsType> =(props)=>{
    return <div>
            <Paginator 
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize} 
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged} 
            portionSize={5}
            />
            <FriendsMap       
            friendsData={props.friendsData}
            followingInProgres={props.followingInProgres}
            follow={props.follow}
            unfollow={props.unfollow}
            />
            </div>
}


export default Friends