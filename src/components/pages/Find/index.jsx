import React, {Component} from 'react'
import "./index.scss"
import {Outlet} from "react-router-dom"
import NavBar from "./NavBar"

class Find extends Component {
    render() {
        return (
            <div className="find">
                <div className="top">
                    <NavBar></NavBar>
                </div>
                <Outlet/>
            </div>
        )
    }
}

export default Find