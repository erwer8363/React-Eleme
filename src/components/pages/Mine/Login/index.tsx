import React, {type FC, useState} from 'react'
import "./index.scss"
import {NavBar} from 'antd-mobile';
import LoginTextForm from "./LoginTextForm.tsx"
import LoginUserForm from "./LoginUserForm.tsx"
import {useNavigate} from "react-router-dom";

const Login: FC = () => {
    const navigate = useNavigate()
    const [loginType, setLoginType] = useState<'text' | 'user'>("text")


    const goUser = () => {
        navigate("/mine/user", {replace: true})
    }

    const changeLoginType = () => {
        const isText = loginType === 'text'
        const LoginForm = isText ? LoginTextForm : LoginUserForm;
        const title = isText ? "短信快捷登录" : "账号密码登录"

        const changeType = () => {
            setLoginType(isText ? "user" : "text")
        }
        return (
            <div className="content">
                <img src="https://shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" alt=""/>
                <LoginForm handleSuccess={goUser}/>
                <p onClick={changeType} className="change-type">{title}</p>
            </div>
        )
    }

    return (
        <div>
            <NavBar onBack={() => navigate("/", {replace: true})}>
                {loginType === "text" ? "短信快捷" : "账户密码"}登录
            </NavBar>
            {
                changeLoginType()
            }
        </div>
    )
}

export default Login