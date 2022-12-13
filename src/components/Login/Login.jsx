import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Input} from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { login } from "../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import s from "../Common/Utils/FormControls.module.css"

const maxLength20=maxLengthCreator(20)

const LoginForm=(props)=> {
    return <div>
        <h1>LOGIN</h1>
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Input} validate={[requiredField,maxLength20]} name={'email'} placeholder={'Login'} /></div>
            <div><Field component={Input} validate={[requiredField,maxLength20]} name={'password'} placeholder={'Password'} type={'password'} /></div>
            <div><Field component={Input} validate={[maxLength20]} name={'rememberMe'} type={'checkbox'} />remember me</div>
            {props.error&&<div className={s.error}>{props.error}</div>}
            <div><button>Login</button></div>
        </form>
    </div>
    
}

const LoginReduxForm=reduxForm({form: "Login"})(LoginForm)

const Login=(props)=> {
    const onSubmit = (formData) => {
       props.login(formData.email,formData.password,formData.rememberMe)
    }
    if(props.isAuth){
        return <Navigate to={"/profile"} />
    }

    return <LoginReduxForm onSubmit={onSubmit} /> 
}

const mapStateToProps=(state)=>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login}) (Login) 