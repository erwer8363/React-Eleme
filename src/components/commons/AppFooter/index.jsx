import React, {Component} from 'react'
import './index.scss'
import {NavLink} from 'react-router-dom'

class AppFooter extends Component {
    renderFooter() {
        // if("pathname"="/home/homedetail")return false
        let {navs} = this.props
        return (
            navs.map(item => {
                return (
                    <NavLink key={item.id} to={item.path}>
                        <i className={"fa fa-" + item.icon}></i>
                        <span>{item.title}</span>
                    </NavLink>
                )
            })
        )
    }

    render() {
        return (
            <div className="app_footer">
                {this.renderFooter()}
            </div>
        )
    }
}

AppFooter.defaultProps = {
    navs: [
        {id: 1, path: "/home", icon: "home", title: "首页"},
        {id: 2, path: "/find", icon: "podcast", title: "发现"},
        {id: 3, path: "/order", icon: "book", title: "订单"},
        {id: 4, path: "/mine", icon: "user", title: "我的"},
    ]
}
export default AppFooter