import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";

const maxLength10=maxLengthCreator(10)

const LoginForm=(props)=> {
    return <div>
        <h1>LOGIN</h1>
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Input} validate={[requiredField,maxLength10]} name={'Login'} placeholder={'Login'} /></div>
            <div><Field component={Input} validate={[requiredField,maxLength10]} name={'Password'} placeholder={'Password'} /></div>
            <div><Field component={Input} validate={[requiredField,maxLength10]} name={'RememberMe'} type={'checkbox'} />remember me</div>
            <div><button>Login</button></div>
        </form>
    </div>
    
}

const LoginReduxForm=reduxForm({form: "Login"})(LoginForm)

const Login=(props)=> {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return <LoginReduxForm onSubmit={onSubmit} /> 
}


export default  Login 