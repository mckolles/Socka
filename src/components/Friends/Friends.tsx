import React from "react";
import {Paginator} from "../Common/Utils/Paginator";
import {FriendsMap} from "./FriendsMap";
import { PropsType } from "./FriendsContainer";



let Friends:React.FC<PropsType> =(props)=>{
    return <div>
            <Paginator 
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize} 
            currentPage={props.currentPage}
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