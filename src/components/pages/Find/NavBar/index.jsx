import React, {Component} from 'react'
import "./index.scss"
import {NavLink} from 'react-router-dom'
import GroupState from "../../../../modules/group"
import {withRouter} from "@/utils/withRouter";

class NavBar extends Component {
    componentWillReceiveProps(props) {
        let pathname = this.props.location.pathname
        let item = 1
        // console.log(this.props.activeItem)
        switch (pathname) {
            case '/find/coin':
                item = 1
                break;
            case '/find/record':
                item = 2
                break;
            default:
                break;
        }
        this.props.changeActiveItem(item)
    }

    componentDidMount() {
        let pathname = this.props.location.pathname
        let item = 1
        // console.log(this.props.activeItem)
        switch (pathname) {
            case '/find/coin':
                item = 1
                break;
            case '/find/record':
                item = 2
                break;
            default:
                break;
        }
        this.props.changeActiveItem(item)
    }

    renderNavs() {
        let {navs, activeItem} = this.props
        return (
            navs.map(item => {
                return (
                    <NavLink key={item.id} to={item.path}>
                        <div className={"headerItem " + item.name + " " + (item.id === activeItem ? "active" : "")}
                             onClick={this.handleClick}>
                            <i className={"fa fa-" + item.icon}></i>
                            <span>{item.title}</span>
                        </div>
                    </NavLink>
                )
            })
        )
    }

    render() {
        // console.log(this.props.activeItem)
        return (
            <div className="headerBox">

                {this.renderNavs()}
            </div>
        )
    }
}

NavBar.defaultProps = {
    navs: [
        {id: 1, path: "/find/coin", icon: "usd", title: "金币", name: "coin"},
        {id: 2, path: "/find/record", icon: "file-o", title: "兑换记录", name: "record"}
    ]
}
export default withRouter(GroupState(NavBar, {
    reducer: "find",
    states: ["activeItem"]
}))