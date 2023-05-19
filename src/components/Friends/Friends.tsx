import React from "react";
import {Paginator} from "../Common/Utils/Paginator";
import {FriendsMap} from "./FriendsMap";
import { PropsType } from "./FriendsContainer";



let Friends:React.FC<PropsType> =(props)=>{
    return <div>
            <Paginator 
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize} 
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged} 
            portionSize={5}
            />
            <FriendsMap {...props}
            />
            </div>
}


export default Friends