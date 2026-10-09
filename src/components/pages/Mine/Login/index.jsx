import React, {Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"
import {NavBar} from 'antd-mobile';
import LoginTextForm from "./LoginTextForm"
import LoginUserForm from "./LoginUserForm"
import {withRouter} from "@/utils/withRouter";

class Login extends Component {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.state = {
            loginType: "text"
        }
    }

    login() {
        this.props.login(
            {
                username: "admin",
                password: "456",
                success: data => {
                    this.props.navigate("/mine/user", {replace: true})
                },
                fail: err => {
                    // alert(err)
                }
            }
        )
    }

    changeLoginType() {
        let Form = LoginTextForm;
        let {loginType} = this.state;
        let title = "账号密码登录"
        let type = "user"
        if (loginType !== "text") {
            Form = LoginUserForm
            title = "短信快捷登录"
            type = "text"
        }
        const changeType = () => {
            this.setState({
                loginType: type
            })
        }
        return (
            <div className="content">
                <img src="https://shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" alt=""/>
                <Form/>
                <p onClick={changeType} className="change-type">{title}</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <NavBar onBack={() => this.props.navigate("/", {replace: true})}>
                        {this.state.loginType === "text" ? "短信快捷" : "账户密码"}登录</NavBar>
                    {
                        this.changeLoginType()
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(GroupState(Login, {
    reducer: "mine",
    states: ["userInfo"]
}))