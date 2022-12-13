import React from "react";
import {Paginator} from "../Common/Utils/Paginator";
import {FriendsMap} from "./FriendsMap";

let Friends =(props)=>{
    return <div>
            <Paginator 
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize} 
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged} 
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