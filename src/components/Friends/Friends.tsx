    import React from "react";
    import {Paginator} from "../Common/Utils/Paginator";
    import {FriendsMap} from "./FriendsMap";
    import { FriendsSearchForm } from "./FriendsSearchForm";

    let Friends:React.FC =()=>{
        return <div>
                <FriendsSearchForm />
                <Paginator />
                <FriendsMap />
                </div>
    }



    export default Friends