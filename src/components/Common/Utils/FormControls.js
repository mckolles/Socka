import React from "react"
import s from "../Utils/FormControls.module.css"

export const Textarea=({input,meta,...props})=>{
    const hasError=meta.touched && meta.error 
    return (
        <div >
           <div>
            <textarea className={s.formControl&&hasError}  {...input} {...props} />
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
            <input className={s.formControl&&hasError}  {...input} {...props} />
            </div> 
            {hasError&& <span className={s.spanError}>{meta.error}</span>}
        </div>
    )
}

