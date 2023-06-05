import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input} from "../Common/Utils/FormControls";
import { maxLengthCreator, requiredField } from "../Common/Utils/Validators/Validator";
import { login } from "../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import s from "../Common/Utils/FormControls.module.css"
import { getCaptchaUrl, getIsAuth } from "../../Redux/componentsSelectors";


type LoginFormOwnProps={
    captchaUrl:string|null
}

 type FormDataType={
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string,
  }



const maxLength20=maxLengthCreator(20)
const maxLength6=maxLengthCreator(6)

const LoginForm:React.FC<InjectedFormProps<FormDataType,LoginFormOwnProps>&LoginFormOwnProps>=(props)=> {
    
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

const LoginReduxForm=reduxForm<FormDataType,LoginFormOwnProps>({form: "Login"})(LoginForm)

const Login:React.FC=()=> {
    const isAuth=useSelector(getIsAuth)
    const captchaUrl=useSelector(getCaptchaUrl)

    const dispatch=useDispatch()
    const onSubmit = (formData:FormDataType) => {
        //@ts-ignore
        dispatch(login(formData.email,formData.password,formData.rememberMe,formData.captcha))
    }
    if(isAuth){
        return <Navigate to={"/profile"} />
    }

    return <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} /> 
}


export default Login 