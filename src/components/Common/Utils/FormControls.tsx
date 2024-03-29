import React from "react"
import s from "./FormControls.module.css"
import {WrappedFieldProps} from "redux-form"



export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error 
    return (
        <div>
            <div>
              <textarea className={hasError ? s.formControl : undefined} {...input} {...props} />
            </div> 
            {hasError && <span className={s.spanError}>{meta.error}</span>}
        </div>
    )
}


export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error 
    return (
        <div>
            <div>
              <input className={hasError ? s.formControl : undefined} {...input} {...props} />
            </div> 
            {hasError && <span className={s.spanError}>{meta.error}</span>}
        </div>
    )
}
