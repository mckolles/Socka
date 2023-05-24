import React, { ChangeEvent } from "react"; 
import { useEffect } from "react";
import { useState } from "react";

type PropsType ={
    status:string,
    updateStatus:(newStatus:string)=>void
}
    
type StateType ={
    status:string
} 


    const ProfileStatusWithHooks:React.FC<PropsType&StateType> =React.memo((props)=>{
            let [editMode,setEditMode]=useState(false)   
            const activateEditMode = ()=>{
                setEditMode(true)
            }
            const deactivateEditMode = ()=>{
                setEditMode(false)
                props.updateStatus(status)
            }
            let [status,setStatus]=useState(props.status)
            const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
                setStatus(e.target.value)
         }
            useEffect(()=>{
                setStatus(props.status)
            },[props.status])
        

            return(
            <>
            {!editMode && <span onClick={activateEditMode} >{props.status||"---"}</span>}
            {editMode && <input  onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
            </>
            )
        })
    

    export default ProfileStatusWithHooks