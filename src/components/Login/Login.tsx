import React from "react";
import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input} from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { login } from "../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import s from "../Common/Utils/FormControls.module.css"
import { AppStateType } from "../../Redux/reduxStore";


type LoginFormOwnProps={
    captchaUrl:string
}

 type FormDataType={
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string,
  }

  type MapDispatchToPropsType={
    login:(email:string,password:string,rememberMe:boolean,captcha:string)=>void
}

type MapStateToPropsType={
    isAuth:boolean,
    captchaUrl:string|null

}


const maxLength20=maxLengthCreator(20)
const maxLength6=maxLengthCreator(6)

const LoginForm:React.FC<InjectedFormProps<FormDataType&LoginFormOwnProps>>=(props)=> {
    return <div>
        <h1>LOGIN</h1>
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Input} validate={[requiredField,maxLength20]} name={'email'} placeholder={'Login'} /></div>
            <div><Field component={Input} validate={[requiredField,maxLength20]} name={'password'} 
            placeholder={'Password'} type={'password'}/></div>
            <div><p className={s.checkbox}>Remember me</p><Field component={Input} validate={[maxLength20]} 
            name={'rememberMe'} type={'checkbox'} />
            </div>
            {props.captchaUrl&& <div><Field component={Input}
             validate={[requiredField,maxLength6]} name={'captcha'} placeholder={'Symbols from image'}/></div>}
            {props.captchaUrl&&<div className={s.captcha}><img src={props.captchaUrl} alt='captcha'/></div>}
            {props.error&&<div className={s.error}>{props.error}</div>}
            <div><button>Login</button></div>
        </form>
    </div>
    
}

const LoginReduxForm=reduxForm({form: "Login"})(LoginForm)

const Login:React.FC<MapStateToPropsType&MapDispatchToPropsType>=(props)=> {
    const onSubmit = (formData:FormDataType) => {
       props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }
    if(props.isAuth){
        return <Navigate to={"/profile"} />
    }

    return <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} /> 
}



const mapStateToProps=(state:AppStateType):MapStateToPropsType=>({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect(mapStateToProps,{login}) (Login) 