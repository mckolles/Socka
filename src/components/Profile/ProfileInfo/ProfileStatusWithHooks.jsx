import React from "react"; 
import { useEffect } from "react";
import { useState } from "react";

    const ProfileStatusWithHooks =(props)=>{
            let [editMode,setEditMode]=useState(false)   
            const activateEditMode = ()=>{
                setEditMode(true)
            }
            const deactivateEditMode = ()=>{
                setEditMode(false)
                props.updateStatus(status)
            }
            let [status,setStatus]=useState(props.status)
            const onStatusChange=(e)=>{
                setStatus(e.target.value)
         }
            useEffect(()=>{
                setStatus(props.status)
            },[props.status])
            debugger
        

            return(
            <>
            {!editMode && <span onClick={activateEditMode} >{props.status||"---"}</span>}
            {editMode && <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
            </>
            )
        }
    

    export default ProfileStatusWithHooks