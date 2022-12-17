import React from "react"
import s from "../Utils/FormControls.module.css"

export const Textarea=({input,meta,...props})=>{
    const hasError=meta.touched && meta.error 
    return (
        <div >
           <div>
            <textarea className={hasError?s.formControl:undefined}  {...input} {...props} />
            </div> 
            {hasError&& <span className={s.spanError}>{meta.error}</span>}
        </div>
    )
}
export const Input=({input,meta,...props})=>{
    const hasError=meta.touched && meta.error 
    return (
        <div >
           <div>
            <input className={hasError?s.formControl:undefined}  {...input} {...props} />
            </div> 
            {hasError&& <span className={s.spanError}>{meta.error}</span>}
        </div>
    )
}

